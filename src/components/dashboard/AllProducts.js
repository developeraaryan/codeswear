import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  Link,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Image from "next/image";



const AllProducts = ({ Products }) => {
  return (
    <BaseCard title="Products">
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            mt: 2,
            whiteSpace: "wrap",

          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h3">
                  Title
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ textAlign: "center" }} color="textSecondary" variant="h3">
                  Slug
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h3">
                  Image
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h3">
                  Category
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h3">
                  Size
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h3">
                  Quantity
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h3">
                  Price
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Products.map((product) => (

              <TableRow key={product._id}>
                <TableCell>
                  <Link
                    underline="none"
                    href={`/admin/product/${product._id}`}
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "text.primary",
                    }}
                  >
                    {product.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "600",
                        }}
                      >
                        {product.slug}
                      </Typography>

                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" alignSelf="center">
                    <Image src={product.img[0].url} height={50} width={50} alt="a" />

                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6">
                    {product.category}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      ml: "10px",
                      backgroundColor: "White",
                      color: "Black",
                      textAlign: "center",
                      fontWeight: "600",
                      fontSize: "15px",
                    }}
                    size="medium"
                    label={`${product.size}`}
                  ></Chip>
                </TableCell>
                <TableCell align="right">
                  <Typography sx={{
                    color: product.availableqty == 0 ? "Red" : "Green",
                    fontWeight: "600",
                    fontSize: "15px",
                    textAlign: "center"
                  }} variant="h6">{product.availableqty == 0 ? "out of stock" : product.availableqty}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">₹{product.price}.00</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </BaseCard>
  );
};

export default AllProducts;
