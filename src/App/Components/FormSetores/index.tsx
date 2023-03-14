/* eslint-disable react-hooks/exhaustive-deps */

import {
  patchSetor,
  postSetor,
  selectCargoExiste,
  selectSetorExiste,
} from "../../../Store/setores/setoresSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import { useEffect, useState } from "react";

import Box from "../../../components/Box/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Heading from "../../../components/Heading/Heading";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Text from "../../../components/Text/Text";
import TextField from "@mui/material/TextField";
import styles from "./styles.module.scss";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";

export default function FormSetores() {
  const { id } = useParams();
  const setor = useAppSelector((state) =>
    state.setores.data.find((setor) => id && setor.id === parseInt(id))
  );
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarName, setSnackbarName] = useState("");

  const handleDelete = (index: number) => {
    const newCargos = [...formik.values.cargos];
    newCargos.splice(index, 1);
    formik.setFieldValue("cargos", newCargos);
  };

  const handleAddCargo = (cargoNome: string) => {
    if (cargoNome) {
      const cargoExiste =
        formik.values.cargos.some((cargo) => cargo.nome === cargoNome) ||
        selectCargoExiste(cargoNome)(state);

      if (!cargoExiste) {
        const newCargo = {
          nome: cargoNome,
        };
        const newCargos = [...formik.values.cargos, newCargo];
        formik.setFieldValue("cargos", newCargos);
        formik.setFieldValue("cargo", ""); // limpa o campo de adicionar cargo
      } else {
        formik.setFieldError("cargo", "Cargo já existe.");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      nome: setor?.nome ?? "",
      cargo: "",
      cargos: setor?.cargos ?? [],
    },
    onSubmit: (values) => {
      if (id) {
        dispatch(
          patchSetor({
            params: {
              id: parseInt(id),
            },
            payload: {
              cargos: values.cargos,
              id: parseInt(id),
              nome: values.nome,
            },
          })
        );
        setOpenSnackbar(true);
        setSnackbarName("Setor editado com sucesso.");
      } else {
        const setorExiste = selectSetorExiste(values.nome)(state);

        if (setorExiste) {
          formik.setFieldError("nome", "Setor já existe.");
          return;
        }
        dispatch(
          postSetor({
            cargos: values.cargos,
            nome: values.nome,
          })
        );
        setOpenSnackbar(true);
        setSnackbarName("Setor criado com sucesso.");
        formik.setValues({
          nome: "",
          cargo: "",
          cargos: [],
        });
      }
    },
  });

  useEffect(() => {
    if (setor) {
      formik.setValues({
        nome: setor.nome,
        cargo: "",
        cargos: setor.cargos ?? [],
      });
    } else {
      formik.setValues({
        nome: "",
        cargo: "",
        cargos: [],
      });
    }
  }, [setor]);

  return (
    <form onSubmit={formik.handleSubmit} className={styles.container}>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={openSnackbar}
        message={snackbarName}
        onClose={() => setOpenSnackbar(!openSnackbar)}
      />
      <Box>
        <Heading marginBottom={2} fontSize={36}>
          {id ? "EDITAR SETOR" : "ADICIONAR SETOR"}
        </Heading>

        <Box className={styles.textfieldsWrapper}>
          <Box>
            <TextField
              fullWidth
              {...formik.getFieldProps("nome")}
              placeholder="Nome"
            />

            <Text paddingTop={1} paddingLeft={1} fontSize={14} color="red">
              {formik.touched.nome && formik.errors.nome}
            </Text>
          </Box>

          <Box>
            <Box className={styles.cargoWrapper}>
              <TextField
                {...formik.getFieldProps("cargo")}
                fullWidth
                placeholder="CARGO(S)"
              />
              <Button
                onClick={() => handleAddCargo(formik.values.cargo)}
                variant="contained"
              >
                ADICIONAR
              </Button>
            </Box>
            <Text paddingTop={1} paddingLeft={1} fontSize={14} color="red">
              {formik.touched.cargo && formik.errors.cargo}
            </Text>
          </Box>

          <Stack direction="row" spacing={1}>
            {formik.values.cargos.map((cargo, index) => {
              return (
                <Chip label={cargo.nome} onDelete={() => handleDelete(index)} />
              );
            })}
          </Stack>
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Button type="submit" size="large" variant="contained">
          SALVAR
        </Button>
      </Box>
    </form>
  );
}
