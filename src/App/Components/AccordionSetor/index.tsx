import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Arrow from "../../../components/Icons/Arrow/Arrow";
import Box from "../../../components/Box/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Setor } from "../../../Store/setores/models";
import { deleteSetores } from "../../../Store/setores/setoresSlice";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../../Store/store";
import { useState } from "react";

interface Props {
  setor: Setor;
}

export default function AccordionSetor({
  setor,
}: React.PropsWithChildren<Props>) {
  const [expanded, setExpanded] = useState("");

  const dispatch = useAppDispatch();

  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box className={styles.container}>
      <Accordion
        classes={{
          root: styles.accordionRoot,
          expanded: styles.accordionExpanded,
        }}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          classes={{
            root: styles.accordionSummaryRoot,
            expanded: styles.accordionSummaryExpanded,
            expandIconWrapper: styles.accordionSummaryExpandedIcon,
          }}
          expandIcon={<Arrow />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          {setor.nome}
        </AccordionSummary>

        <Box className={styles.lineShadow}></Box>
        <AccordionDetails classes={{ root: styles.accordionDetails }}>
          <Box className={styles.detailsWrapper}>
            <Box className={styles.cargosWrapper}>
              {setor.cargos.map((cargo, index) => {
                return (
                  <Box key={`${cargo.id} ${index}`} className={styles.cargoBox}>
                    {cargo.nome}
                  </Box>
                );
              })}
            </Box>

            <Box className={styles.buttonWrapper}>
              <Button size="small" variant="contained">
                <Link to={`/${setor.id}`}>EDITAR</Link>
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={() => dispatch(deleteSetores({ id: setor.id }))}
              >
                EXCLUIR
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
