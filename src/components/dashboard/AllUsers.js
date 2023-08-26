import React, {  } from "react";
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
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";



const AllProducts = ({ Users }) => {
    return (
        <BaseCard title="Users">
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
                                    First Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ textAlign: "left" }} color="textSecondary" variant="h3">
                                    Last Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="h3">
                                    Email
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="h3">
                                    Phone
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="textSecondary" variant="h3">
                                    Role
                                </Typography>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Users.map((user) => (

                            <TableRow key={user._id}>
                                <TableCell>
                                    <Box
                                        underline="none"
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                            color: "text.primary",
                                        }}
                                    >
                                        {user?.firstName}
                                    </Box>
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
                                                {user?.lastName}
                                            </Typography>

                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" alignSelf="center">
                                        { user?.email}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="h6">
                                        {user?.phone}
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
                                        label={`${user?.role}`}
                                    ></Chip>
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
