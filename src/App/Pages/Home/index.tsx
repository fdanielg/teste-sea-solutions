import { Link, useParams } from "react-router-dom";

import Box from "../../../components/Box/Box";
import Building from "../../../components/Icons/Building/Building";
import Container from "../../../components/Container/Container";
import FormSetores from "../../Components/FormSetores";
import Heading from "../../../components/Heading/Heading";
import Setores from "../../Components/Setores";
import Text from "../../../components/Text/Text";
import styles from "./styles.module.scss";

export default function Home() {
  const { id } = useParams();

  console.log(id);
  return (
    <Box className={styles.container}>
      <Container>
        <Box className={styles.top}>
          <Link to="/">
            <Building />
            <Text>Setores</Text>
          </Link>
        </Box>

        <Box className={styles.bottom}>
          <Box className={styles.left}>
            <Heading marginBottom={2} fontSize={36}>
              SETORES
            </Heading>

            <Setores />
          </Box>

          <Box className={styles.right}>
            <FormSetores />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
