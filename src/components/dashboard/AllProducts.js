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
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Image from "next/image";



const AllProducts = ({ products }) => {
  useEffect(() => {
    console.log(products);
  }, [])
  return (
    <BaseCard title="Products">
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
              <Typography color="textSecondary" variant="h3">
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
                Size/Color
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
          {products.map((product) => (

            <TableRow key={product._id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.title}
                </Typography>
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
                <Typography color="textSecondary"  alignSelf="center">
                  <Image src={product.img} height={50} width={50} alt="a" />

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
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: product.color == "White" ? "#f5f5f5" : product.color,
                    color: "Black",
                  }}
                  size="small"
                  label={`(${product.size}/${product.color})`}
                ></Chip>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{
                  color: product.availableqty == 0 ? "Red" : "Green"
                }} variant="h6">{product.availableqty == 0 ? "out of stock" : product.availableqty}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">₹{product.price}.00</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default AllProducts;
