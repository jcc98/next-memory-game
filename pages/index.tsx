import type { NextPage } from 'next'
import {useEffect} from "react"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

 interface IData {
  id: "string",
  title: "string",
  original_title: "string",
  url: "string",
  image: "string",
  key: "any";
}

interface IFilmObject {
  imgSrc: "string",
  name: "string",
}

export async function getServerSideProps() {

  const res = await fetch ("https://ghibliapi.herokuapp.com/films")
  const data = await res.json()
  
  return {
    props: {data}
  }
}


const Home = ({data}: {data:IData[]} ) => {


  //Assign properties to 2 arrays
  let filmImages:string[] = data.map((films) => films.image)
  let filmNames:string[] = data.map((films) => films.title )
  let filmArray:any[] = []

  //Shuffle algorithm

    let currentIndex = filmImages.length, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [filmImages[currentIndex], filmImages[randomIndex]] = [
        filmImages[randomIndex], filmImages[currentIndex]];

      [filmNames[currentIndex], filmNames[randomIndex]] = [
        filmNames[randomIndex], filmNames[currentIndex]];
      
    }

    console.log(filmNames)



      //Get 8 images
  filmImages.splice(8);
  filmNames.splice(8);
    //Duplicate the array values for the memory game
    filmImages.forEach((images) => {
      filmImages.push(images)
    })
    filmNames.forEach((names) => {
      filmNames.push(names)
    })

  //Make an object with arrays
  for (let i = 0; i < filmImages.length; i++) {
    filmArray.push({imgSrc: filmImages[i], name: filmNames[i]})
  }


  //Display them
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Memory game" />
      </Head>
      <div className={styles.container}>
      <div className={styles.main}>
          {filmArray.map((film, key) => <img width="120" src={film.imgSrc} key={key} title-name={film.name}/>)}
        </div>
      </div>
    </>
  )
}

export default Home
