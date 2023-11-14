import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";

function MenuCard() {
  return (
    <>
      <Box padding="1% 3%">
        <Flex justifyContent="space-between">
          <Text fontWeight="bold" fontSize="2xl">
            Menu
          </Text>
          <Text fontWeight="bold">Sort by</Text>
        </Flex>
      </Box>
      <Box padding="1% 3%">
        <Grid templateColumns="repeat(5, 1fr)" gap={5}>
          <GridItem>
            <Flex
              flexDirection="column"
              bgColor="white"
              width="200px"
              alignItems="center"
              padding="5%"
              rounded="xl"
            >
              <Image
                boxSize="200px"
                height="200px"
                objectFit="cover"
                rounded="xl"
                src="https://asset.kompas.com/crops/JFC1_i_OaGvcNEviEw4WKk-r3qQ=/12x51:892x637/750x500/data/photo/2022/03/05/622358ed771fb.jpg"
              />

              <Text fontWeight="bold">Burger Kelinci</Text>
              <Text fontWeight="bold" color="orange">
                Rp.15.000,00
              </Text>
              <Text>
                {" "}
                <Text as={"span"} fontWeight="bold">
                  50
                </Text>{" "}
                in stock
              </Text>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default MenuCard;
