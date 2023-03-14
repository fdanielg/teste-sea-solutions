import { useAppDispatch, useAppSelector } from "../../../Store/store";

import Box from "../../../components/Box/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Heading from "../../../components/Heading/Heading";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";

export default function FormSetores() {
  const { id } = useParams();
  const setor = useAppSelector((state) =>
    state.setores.data.find((setor) => id && setor.id === parseInt(id))
  );
  const dispatch = useAppDispatch();

  const handleDelete = (index: number) => {
    const newCargos = formik.values.cargos.filter(
      (cargo) => cargo.id ?? cargo.id !== id
    );
    formik.setFieldValue("cargos", newCargos);
  };

  const handleAddCargo = () => {
    const cargoNome = formik.values.cargo.trim();
    if (cargoNome) {
      const cargoExistente = formik.values.cargos.find(
        (cargo) => cargo.nome.toLowerCase() === cargoNome.toLowerCase()
      );
      if (!cargoExistente) {
        const newCargo = {
          id: Math.random(),
          nome: cargoNome,
        };
        const newCargos = [...formik.values.cargos, newCargo];
        formik.setFieldValue("cargos", newCargos);
        formik.setFieldValue("cargo", ""); // limpa o campo de adicionar cargo
      } else {
        alert("O cargo já existe na lista de cargos.");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      nome: setor?.nome,
      cargo: "",
      cargos: setor?.cargos ?? [],
    },
    onSubmit: (values) => {
      if (id) {
        //editar
      } else {
        //adicionar
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
    }
  }, [setor]);

  return (
    <Box className={styles.container}>
      <Box>
        <Heading marginBottom={2} fontSize={36}>
          {id ? "EDITAR SETOR" : "ADICIONAR SETOR"}
        </Heading>

        <Box className={styles.textfieldsWrapper}>
          <TextField {...formik.getFieldProps("nome")} placeholder="Nome" />

          <Box className={styles.cargoWrapper}>
            <TextField
              {...formik.getFieldProps("cargo")}
              fullWidth
              placeholder="CARGO(S)"
            />
            <Button onClick={handleAddCargo} variant="contained">
              ADICIONAR
            </Button>
          </Box>
          <Stack direction="row" spacing={1}>
            {formik.values.cargos.map((cargo) => {
              return (
                <Chip
                  label={cargo.nome}
                  onDelete={() => handleDelete(cargo.id)}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>

      <Box display="flex" justifyContent="flex-end">
        <Button size="large" variant="contained">
          SALVAR
        </Button>
      </Box>
    </Box>
  );
}
