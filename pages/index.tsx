import type { NextPage } from 'next'
import Head from 'next/head'
import React, {useEffect, useRef} from 'react'
import styles from '../styles/Home.module.scss'
import Page from './components/page'
import PageLast from './components/pageLast'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { IMAGE_LIST, createPublicImagePath } from '../data/images'
import { Hearts } from 'react-loader-spinner'

import { Button, Grid, Box, ToggleButton, ToggleButtonGroup  } from '@mui/material';

import styled from "@emotion/styled";
import SplitTextToChars from "./components/SplitTextToChars";
import Image from "next/image";
const TextStyled = styled.p`
  font-size: calc(32px + (64 - 32) * ((100vw - 320px) / (1600 - 320)));
  font-family: poppins;
  font-weight: 500;
  margin: 0;
  position: absolute;
`;

const Home: NextPage = () => {

  gsap.registerPlugin(ScrollTrigger)

  const pagesWrapperRef = useRef<HTMLDivElement | null >(null);
  const pagesRef = useRef<HTMLDivElement | null >(null);
  const didEffect = React.useRef(false);
  const wavyTextRef = useRef(null);

  const [alignment, setAlignment] = React.useState('web');
  const handleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
  ) => {
    setAlignment(newAlignment);
    console.log('変わった' + newAlignment);
  };

  const setupGsap = (pagesElement: HTMLDivElement, pagesWrapperElement: HTMLDivElement) => {
    gsap.to(pagesElement, {
      x: () => -(pagesElement.clientWidth - pagesWrapperElement.clientWidth),
      ease: 'none',
      scrollTrigger: {
        trigger: '#horizontal-scroll-section',
        start: 'top top',
        end: () => `+=${pagesElement.clientWidth - pagesWrapperElement.clientWidth}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
    gsap.to('main', {
      scrollTrigger: {
        trigger: '#horizontal-scroll-section',
        start: 'top center',
        end: () => `+=${pagesElement.clientWidth - pagesWrapperElement.clientWidth + 200}`,
        scrub: true,
        onEnter: () => gsap.to('main', {
          backgroundColor: '#736E66',
          duration: 1.4
        }),
        onLeave: () => gsap.to('main', {
          backgroundColor: '#fff',
          duration: 1.4
        }),
        onEnterBack: () => gsap.to('main', {
          backgroundColor: '#736E66',
          duration: 1.4
        }),
        onLeaveBack: () => gsap.to('main', {
          backgroundColor: '#fff',
          duration: 1.4
        }),
      },
    })
  }

  useEffect(() => {
    if (didEffect.current) return
    didEffect.current = true;
    const pagesElement = pagesRef?.current;
    if(!pagesElement) return

    const pagesWrapperElement = pagesWrapperRef?.current;
    if(!pagesWrapperElement) return
    setupGsap(pagesElement, pagesWrapperElement)

    if (!wavyTextRef.current) return;
    const chars = SplitTextToChars(wavyTextRef.current);

    gsap.set(wavyTextRef.current, { perspective: 400 });

    // @ts-ignore
    gsap.from(chars, {
      duration: 0.2,
      opacity: 0,
      scale: 1,
      delay: 2,
      y: -40,
      rotationX: -90,
      transformOrigin: "0% 50% -50",
      ease: "inOut",
      stagger: 0.025
    }, "+=0");

  }, [])

  // @ts-ignore
  return (
    <div>
      <Head>
        <title>2023 みさ展</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="color1">
        <section className={styles.section} id="horizontal-scroll-section">
          <div className={styles.container}>
            <div className={styles.pagesWrapper} ref={pagesWrapperRef}>

              <Grid container alignItems='center' justifyContent='center' direction="column">
                <Grid item xs={12}>
                  <Box pt={3}>
                    <div style={{position: "absolute", margin: "0 auto", zIndex: "99999"}}>

                      <ToggleButtonGroup
                          color="primary"
                          value={alignment}
                          exclusive
                          onChange={handleChange}
                          aria-label="Platform"
                      >
                        <ToggleButton value="kyoto">京都</ToggleButton>
                        <ToggleButton value="hokkaido">北海道</ToggleButton>
                        <ToggleButton value="ishikawa">石川</ToggleButton>
                        <ToggleButton value="sendai">仙台</ToggleButton>
                      </ToggleButtonGroup>

                      <Hearts
                          color="#00BFFF"
                          height={100}
                          width={100}
                          visible={alignment === "hokkaido"}
                      />
                    </div>
                  </Box>
                </Grid>
              </Grid>

              <TextStyled ref={wavyTextRef} className={'color4'}>
                <img src={'/public/images/logo/logo.png'} height={256} width={256}></img>
                2023 みさ展
              </TextStyled>

              <div className={styles.pages} ref={pagesRef} style={{ visibility: alignment === "hokkaido" ? "visible" : "hidden" }}>
                {IMAGE_LIST.map((data) => {
                  return (<Page key={data.id} srcPath={createPublicImagePath(data.id.toString())} portrait={data.portrait}/>)})
                }
                <PageLast/>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
