import { useAppDispatch, useAppSelector } from "../../../Store/store";

import AccordionSetor from "../../Components/AccordionSetor";
import Box from "../../../components/Box/Box";
import { getSetores } from "../../../Store/setores/setoresSlice";
import { useEffect } from "react";

export default function Setores() {
  const dispatch = useAppDispatch();
  const { data: setores } = useAppSelector((state) => state.setores);

  console.log(setores);
  useEffect(() => {
    // @ts-ignore
    dispatch(getSetores());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setores]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {setores.map((setor, index) => {
        return <AccordionSetor key={`${setor.id} ${index}`} setor={setor} />;
      })}
    </Box>
  );
}
