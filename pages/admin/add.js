import {
    Grid,
    Stack,
    TextField,
    Button,
    ThemeProvider
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BaseCard from "../../src/components/baseCard/BaseCard";
import theme from '../../src/theme/theme'
import FullLayout from '../../src/layouts/FullLayout'
import { useState } from "react";

const Add = () => {

    const [form, setForm] = useState("")
    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const submitForm = async (e) => {
        e.preventDefault()
        const product = [{
            title: form.title,
            slug: form.slug,
            category: form.category,
            desc: form.desc,
            color: form.color,
            size: form.size,
            price: form.price,
            availableqty: form.availableqty,
            img: form.img,
            // img2:form.img2,
            // img3:form.img3,
            // img4:form.img4
        }]
        //API request to add a product
        let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
        const data = await res.json()
        setForm("")
        if (data.success) {
            toast.success(`Product added successfully`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.error(data.error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    return (
        <ThemeProvider theme={theme}>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard title="Form Layout">
                            <Stack spacing={3}>
                                <TextField onChange={onChange} value={form.title ? form.title : ""} name="title" label="Title" variant="filled" />
                                <TextField onChange={onChange} value={form.slug ? form.slug : ""} name="slug" label="Slug" variant="filled" />
                                <TextField onChange={onChange} value={form.category ? form.category : ""} name="category" label="Category" variant="filled" />
                                <TextField onChange={onChange} value={form.desc ? form.desc : ""} name="desc" label="Description" variant="filled" multiline rows={4} />
                                <TextField onChange={onChange} value={form.color ? form.color : ""} name="color" label="Color" variant="filled" />
                                <TextField onChange={onChange} value={form.size ? form.size : ""} name="size" label="Size" variant="filled" />
                                <TextField onChange={onChange} value={form.price ? form.price : ""} name="price" label="Price" variant="filled" />
                                <TextField onChange={onChange} value={form.availableqty ? form.availableqty : ""} name="availableqty" label="Quantity" variant="filled" />
                                <TextField onChange={onChange} value={form.img ? form.img : ""} name="img" label="Image 1" variant="filled" />
                                {/* <TextField onChange={onChange} value={form.img2 ? form.img2 : ""} name="img2" label="Image 2" variant="filled" />
                                <TextField onChange={onChange} value={form.img3 ? form.img3 : ""} name="img3" label="Image 3" variant="filled" />
                                <TextField onChange={onChange} value={form.img4 ? form.img4 : ""} name="img4" label="Image 4" variant="filled" /> */}
                            </Stack>
                            <br />
                            <Button onClick={submitForm} className="!bg-[#05b2bd] hover:!bg-[#05b1bda1]" variant="contained" mt={2}>
                                Submit
                            </Button>
                        </BaseCard>
                    </Grid>

                </Grid>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </FullLayout>
        </ThemeProvider>
    );
};

export default Add;
