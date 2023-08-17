import React, { useEffect } from 'react'
import FullLayoyt from '../../src/layouts/FullLayout'
import theme from '../../src/theme/theme'
import { Grid, ImageList, ImageListItem, ThemeProvider } from '@mui/material'
import BaseCard from '../../src/components/baseCard/BaseCard'
import Image from 'next/image'
import { useUserAuth } from "../../context/UserAuthContext";
import { useRouter } from 'next/router'
let role = "user"
const srcset = (image, size, rows = 1, cols = 1) => {

  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    rows: 4,
    cols: 4,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    rows: 4,
    cols: 4,
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    rows: 4,
    cols: 4,
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    rows: 4,
    cols: 4,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    rows: 4,
    cols: 4,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 4,
    cols: 4,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    rows: 4,
    cols: 4,
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    rows: 4,
    cols: 4,
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    rows: 4,
    cols: 4,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    rows: 4,
    cols: 4,
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    rows: 4,
    cols: 4,
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    rows: 4,
    cols: 4,
  },
];


const Imageuploader = () => {
  const { user } = useUserAuth()
  const router = useRouter()

  useEffect(() => {
    const phone = localStorage.getItem('phone')
    if (!user) {
        router.push('/login')
    }
    const getRole = async () => {
        const res = await fetch(`/api/getrole`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phone })

        })
        const data = await res.json()
        if (data.role !== 'admin') {
            router.push('/login')
        }
    }
    getRole()
}, [user,router])
  return (
    <ThemeProvider theme={theme}>
      <style jsx global>
        {
          `
          footer{
            display:none;
          }
          `
        }
      </style>
      <FullLayoyt>
        <h2 className='text-center font-bold text-2xl'>Upload an Image</h2>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Image History">
              <ImageList
                sx={{ height: 450 }}
                variant="quilted"
                cols={4}
                rowHeight={121}
              >
                {itemData.map((item) => (
                  <ImageListItem
                    key={item.img}
                    cols={item.cols || 1}
                    rows={item.rows || 1}
                  >
                    <Image
                      {...srcset(item.img, 121, item.rows, item.cols)}
                      alt={item.title}
                      loading="lazy"
                      width={1000}
                      height={1000}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </BaseCard>
          </Grid>
        </Grid>
      </FullLayoyt>
    </ThemeProvider>)
}

export default Imageuploader