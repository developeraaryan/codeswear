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
  Button,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Image from "next/image";



const AllProducts = ({ orders }) => {
  useEffect(() => {
    console.log((orders));
  }, [])
  return (
    <BaseCard title="Orders">
      <Table
        aria-label="simple table"
        sx={{
          mt: 2,
          whiteSpace: "wrap",

        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <Typography color="textSecondary" variant="h3">
                Order Id
              </Typography>
            </TableCell>
            <TableCell>

              <Typography color="textSecondary" variant="h3">
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h3">
                Phone
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h3">
                Email
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h3">
                Status
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h3">
                Delivery
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h3">
                Amount
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h3">
                Action
              </Typography>
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (

            <TableRow key={order._id}>
              <TableCell align="left">
                <Typography variant="h6">{order.oId}</Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {order.name}
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
                      {order.phone}
                    </Typography>

                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" alignSelf="center">
                  {order.email}

                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: order.status == "Paid" ? "green" : "orange",
                    color: "Black",
                  }}
                  size="small"
                  label={order.status}
                ></Chip>
              </TableCell>
              <TableCell>
                <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: order.deliverStatus == "Delivered" ? "#f5f5f5" : "orange",
                    color: "Black",
                  }}
                  size="small"
                  label={order.deliverStatus}
                ></Chip>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{
                  color: order.availableqty == 0 ? "Red" : "Green"
                }} variant="h6">₹{order.amount}.00</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography sx={{
                  color: order.availableqty == 0 ? "Red" : "Green"
                }} variant="h6">
                  <Button href="/" className="!bg-[#05b1bda1] hover:!bg-[#05b2bd]" variant="contained" mt={2}>
                    Details
                  </Button>
                </Typography>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default AllProducts;
