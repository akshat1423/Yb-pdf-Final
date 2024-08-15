import React, { useEffect, useState } from 'react';
import { Page, Text, View, Image, Document, StyleSheet, Font, Svg } from '@react-pdf/renderer';
import { styles } from './styles/PDFStyles.js';
import { stylesProfile } from './styles/profileStyle.js';
import { stylesSigningOff } from './styles/signingOffStyle.js';
import background from './assets/background.png'
import writeForYourself from './assets/write.jpg';
import pic from './assets/background.jpg';
import csvData from './CSVdata/Posts.csv'
import { useFetchPosts } from '../hooks/useFetchPosts.jsx';
import axios from 'axios';
import replacement from './assets/background.jpg';
import defaultImage from './assets/default.jpg';
import signingOff from './assets/signingoff.png';
import Comic from './Fonts/Comic/ComicNeue-Regular.ttf';
import ComicBold from './Fonts/Comic/ComicNeue-BoldItalic.ttf';
import ComicItalic from './Fonts/Comic/ComicNeue-Italic.ttf';
import Roboto from './Fonts/Roboto/Roboto-Regular.ttf';
import RobotoBold from './Fonts/Roboto/Roboto-Bold.ttf';
import RobotoItalic from './Fonts/Roboto/Roboto-Italic.ttf';
import verified from './assets/verified.png';
import lobster from './Fonts/Roboto_Slab/static/RobotoSlab-Medium.ttf';
import fontFile from './Fonts/Roboto_Slab/static/RobotoSlab-Medium.ttf';
import yb_logo from './assets/yb_logo.png';
import logooo from './assets/logooo.png';
import side from './assets/side2.png';
import bg from './assets/bg.png'
const { createCanvas, loadImage } = require('canvas');
const pixelmatch = require('pixelmatch');


const removeLineBreaks = (text) => {
  // Replace all line breaks with a space
  return text.replace(/(\r\n|\n|\r)/gm, ' ');
};



Font.register({
  family: 'Comic', fonts: [
    { src: Comic },
    { src: ComicBold, fontStyle: 'italic', fontWeight: 700 },
    { src: ComicItalic, fontStyle: 'italic', fontWeight: 400 },
  ]
});


Font.register({
  family: 'Roboto', fonts: [
    { src: Roboto },
    { src: RobotoBold, fontStyle: 'normal', fontWeight: 700 },
    { src: RobotoItalic, fontStyle: 'italic', fontWeight: 400 },
  ]
});

Font.register({ family: 'Lobster', src: fontFile });

Font.registerEmojiSource({
  format: 'png',
  url: "https://twemoji.maxcdn.com/2/72x72/",
});


Font.register({ family: 'LobsterFont', src: lobster });


const PDFGenerator = ({ id, idList }) => {

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI4MTUwMTk4LCJpYXQiOjE3MjI5NjYxOTgsImp0aSI6IjExNTZhMTY0ZTRjYTRiYWM5ZTVhMWE2YzhkMzAxNDIzIiwidXNlcl9pZCI6NjcxOH0.93Oma9kfmFau7NP4L8M3ESylxbdo4mEQkTldwfbY5tg'
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [test, setTest] = useState(false);


  const [largerPosts, setLargerPosts] = useState([]);
  const [largePosts, setLargePosts] = useState([]);
  const [mediumPosts, setMediumPosts] = useState([]);
  const [semiMediumPosts, setSemiMediumPosts] = useState([]);
  const [smallPosts, setSmallPosts] = useState([]);
  const [smallerPosts, setSmallerPosts] = useState([]);
  const [profile, setProfile] = useState(null);

  const [persons, setPersons] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {

        const temp = []

        const response = await axios.get(`https://yearbook.sarc-iitb.org/api/posts/others/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profileResponse = await axios.get(`https://yearbook.sarc-iitb.org/api/authenticate/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profile = profileResponse.data;

        const profileData = { "profiles": [profile] }


        const newProfileResponse = await axios.post("http://localhost:8000/api/profile", profileData)


        const newProfile = newProfileResponse.data[0];

        setProfile(newProfile);


        const responseData = response.data;


        // const postData = { "posts": responseData };

        // const newResponse = await axios.post("http://localhost:8000/api/feed", postData)

        // const newResponseData = newResponse.data;

        let zerothSet = []
        let firstSet = []
        let secondSet = []
        let thirdSet = []
        let fourthSet = []
        let fifthSet = []



        const zerothSetFinal = []
        const firstSetFinal = []
        const secondSetFinal = []
        const thirdSetFinal = []
        const fourthSetFinal = []
        const fifthSetFinal = []


        responseData.forEach((post) => {

          post.content = removeLineBreaks(post.content);

          if (post.content.length >= 1700) {
            zerothSet.push(post);
          }

          else if ((post.content.length >= 1400) && (post.content.length < 1700)) {
            firstSet.push(post)
          }

          else if ((post.content.length >= 800) && (post.content.length < 1400)) {
            secondSet.push(post)
          }

          else if ((post.content.length < 800) && (post.content.length >= 300)) {
            thirdSet.push(post)
          }

          else {
            fourthSet.push(post)
          }

          // else {
          //   fifthSet.push(post)
          // }

        })


        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
        }


        function sortWithPattern(arr, length) {
          // Separate big and small numbers
          const bigPosts = arr.filter((post) => post.content.length > length / 2);
          const smallPosts = arr.filter((post) => post.content.length <= length / 2);

          // Shuffle big and small number arrays
          shuffleArray(bigPosts);
          shuffleArray(smallPosts);

          const result = [];

          // Interleave the elements from both arrays
          for (let i = 0; i < Math.max(bigPosts.length, smallPosts.length); i++) {
            if (bigPosts[i]) result.push(bigPosts[i]);
            if (smallPosts[i]) result.push(smallPosts[i]);
          }

          return result;
        }



        if (fifthSet.length > 0) {

          fifthSet.sort((a, b) => a.content.length - b.content.length);


          let leftPosts = fifthSet.length % 12

          if (leftPosts !== 0 && (fourthSet.length !== 0 || thirdSet.length !== 0 || secondSet.length !== 0 || firstSet.length !== 0 || zerothSet.length !== 0)) {
            for (let i = 0; i < leftPosts; i += 1) {
              fourthSet.push(fifthSet.pop(fifthSet[i]))
            }
          }


          shuffleArray(fifthSet);

          fifthSet = sortWithPattern(fifthSet, 300);




          for (let i = 0; i < fifthSet.length; i += 12) {
            let chunk = fifthSet.slice(i, i + 12);
            let temp = []

            for (let j = 0; j < chunk.length; j += 2) {
              let chunk2 = chunk.slice(j, j + 2)
              temp.push(chunk2)
            }

            fifthSetFinal.push(temp);
          }

        }




        if (fourthSet.length > 0) {

          fourthSet.sort((a, b) => a.content.length - b.content.length);

          let leftPosts = fourthSet.length % 11

          if (leftPosts !== 0 && (thirdSet.length !== 0 || secondSet.length !== 0 || firstSet.length !== 0 || zerothSet.length !== 0)) {
            for (let i = 0; i < leftPosts; i += 1) {
              thirdSet.push(fourthSet.pop(fourthSet[i]))
            }
          }

          shuffleArray(fourthSet);

          fourthSet = sortWithPattern(fourthSet, 300);


          for (let i = 0; i < fourthSet.length; i += 11) {
            let chunk = fourthSet.slice(i, i + 11);
            fourthSetFinal.push(chunk);
          }

        }




        if (thirdSet.length > 0) {

          thirdSet.sort((a, b) => a.content.length - b.content.length);

          let leftPosts = thirdSet.length % 9

          if (leftPosts !== 0 && (secondSet.length !== 0 || firstSet.length !== 0 || zerothSet.length !== 0)) {
            for (let i = 0; i < leftPosts; i += 1) {
              secondSet.push(thirdSet.pop(thirdSet[i]))
            }
          }

          shuffleArray(thirdSet);

          thirdSet = sortWithPattern(thirdSet, 1000);

          for (let i = 0; i < thirdSet.length; i += 9) {
            let chunk = thirdSet.slice(i, i + 9);
            thirdSetFinal.push(chunk);
          }

        }


        if (secondSet.length > 0) {

          secondSet.sort((a, b) => a.content.length - b.content.length);

          let leftPosts = secondSet.length % 7

          if (leftPosts !== 0 && (firstSet.length !== 0 || zerothSet.length !== 0)) {
            for (let i = 0; i < leftPosts; i += 1) {
              firstSet.push(secondSet.pop(secondSet[i]))
            }
          }

          shuffleArray(secondSet)
          secondSet = sortWithPattern(secondSet, 2200);


          for (let i = 0; i < secondSet.length; i += 7) {
            let chunk = secondSet.slice(i, i + 7);
            secondSetFinal.push(chunk);
          }

        }



        if (firstSet.length > 0) {

          firstSet.sort((a, b) => a.content.length - b.content.length);

          let leftPosts = firstSet.length % 5;

          if (leftPosts !== 0 && zerothSet.length !== 0) {
            for (let i = 0; i < leftPosts; i += 1) {
              zerothSet.push(firstSet.pop(firstSet[i]))
            }
          }


          shuffleArray(firstSet)
          firstSet = sortWithPattern(firstSet, 3000);

          for (let i = 0; i < firstSet.length; i += 5) {
            let chunk = firstSet.slice(i, i + 5);
            firstSetFinal.push(chunk);
          }


        }


        if (zerothSet.length > 0) {
          for (let i = 0; i < zerothSet.length; i += 2) {
            let chunk = zerothSet.slice(i, i + 2)
            zerothSetFinal.push(chunk);
          }
        }


        setLargerPosts(zerothSetFinal)
        setLargePosts(firstSetFinal)
        setMediumPosts(secondSetFinal)
        setSemiMediumPosts(thirdSetFinal)
        setSmallPosts(fourthSetFinal)
        setSmallerPosts(fifthSetFinal)



        const fetchPostPromises = idList.map(async (id) => {
          const response = await axios.get(`https://yearbook.sarc-iitb.org/api/posts/others/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const profileResponse = await axios.get(`https://yearbook.sarc-iitb.org/api/authenticate/profile/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const profile = profileResponse.data;

          const profileData = { "profiles": [profile] }


          const newProfileResponse = await axios.post("http://localhost:8000/api/profile", profileData)


          const newProfile = newProfileResponse.data[0];

          // setProfile(newProfile);


          const responseData = response.data;


          // const postData = { "posts": responseData };

          // const newResponse = await axios.post("http://localhost:8000/api/feed", postData)

          // const newResponseData = newResponse.data;

          let zerothSet = []
          let firstSet = []
          let secondSet = []
          let thirdSet = []
          let fourthSet = []
          let fifthSet = []



          const zerothSetFinal = []
          const firstSetFinal = []
          const secondSetFinal = []
          const thirdSetFinal = []
          const fourthSetFinal = []
          const fifthSetFinal = []


          responseData.forEach((post) => {

            post.content = removeLineBreaks(post.content);

            if (post.content.length >= 1700) {
              zerothSet.push(post);
            }

            else if ((post.content.length >= 1400) && (post.content.length < 1700)) {
              firstSet.push(post)
            }

            else if ((post.content.length >= 800) && (post.content.length < 1400)) {
              secondSet.push(post)
            }

            else if ((post.content.length < 800) && (post.content.length >= 300)) {
              thirdSet.push(post)
            }

            else {
              fourthSet.push(post)
            }

            // else {
            //   fifthSet.push(post)
            // }

          })


          function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
          }


          function sortWithPattern(arr, length) {
            // Separate big and small numbers
            const bigPosts = arr.filter((post) => post.content.length > length / 2);
            const smallPosts = arr.filter((post) => post.content.length <= length / 2);

            // Shuffle big and small number arrays
            shuffleArray(bigPosts);
            shuffleArray(smallPosts);

            const result = [];

            // Interleave the elements from both arrays
            for (let i = 0; i < Math.max(bigPosts.length, smallPosts.length); i++) {
              if (bigPosts[i]) result.push(bigPosts[i]);
              if (smallPosts[i]) result.push(smallPosts[i]);
            }

            return result;
          }



          if (fifthSet.length > 0) {

            fifthSet.sort((a, b) => a.content.length - b.content.length);


            let leftPosts = fifthSet.length % 12

            if (leftPosts !== 0 && (fourthSet.length !== 0 || thirdSet.length !== 0 || secondSet.length !== 0 || firstSet.length !== 0 || zerothSet.length !== 0)) {
              for (let i = 0; i < leftPosts; i += 1) {
                fourthSet.push(fifthSet.pop(fifthSet[i]))
              }
            }


            shuffleArray(fifthSet);

            fifthSet = sortWithPattern(fifthSet, 300);




            for (let i = 0; i < fifthSet.length; i += 12) {
              let chunk = fifthSet.slice(i, i + 12);
              let temp = []

              for (let j = 0; j < chunk.length; j += 2) {
                let chunk2 = chunk.slice(j, j + 2)
                temp.push(chunk2)
              }

              fifthSetFinal.push(temp);
            }

          }




          if (fourthSet.length > 0) {

            fourthSet.sort((a, b) => a.content.length - b.content.length);

            let leftPosts = fourthSet.length % 11

            if (leftPosts !== 0 && (thirdSet.length !== 0 || secondSet.length !== 0 || firstSet.length !== 0 || zerothSet.length !== 0)) {
              for (let i = 0; i < leftPosts; i += 1) {
                thirdSet.push(fourthSet.pop(fourthSet[i]))
              }
            }

            shuffleArray(fourthSet);

            fourthSet = sortWithPattern(fourthSet, 300);


            for (let i = 0; i < fourthSet.length; i += 11) {
              let chunk = fourthSet.slice(i, i + 11);
              fourthSetFinal.push(chunk);
            }

          }




          if (thirdSet.length > 0) {

            thirdSet.sort((a, b) => a.content.length - b.content.length);

            let leftPosts = thirdSet.length % 9

            if (leftPosts !== 0 && (secondSet.length !== 0 || firstSet.length !== 0 || zerothSet.length !== 0)) {
              for (let i = 0; i < leftPosts; i += 1) {
                secondSet.push(thirdSet.pop(thirdSet[i]))
              }
            }

            shuffleArray(thirdSet);

            thirdSet = sortWithPattern(thirdSet, 1000);

            for (let i = 0; i < thirdSet.length; i += 9) {
              let chunk = thirdSet.slice(i, i + 9);
              thirdSetFinal.push(chunk);
            }

          }


          if (secondSet.length > 0) {

            secondSet.sort((a, b) => a.content.length - b.content.length);

            let leftPosts = secondSet.length % 7

            if (leftPosts !== 0 && (firstSet.length !== 0 || zerothSet.length !== 0)) {
              for (let i = 0; i < leftPosts; i += 1) {
                firstSet.push(secondSet.pop(secondSet[i]))
              }
            }

            shuffleArray(secondSet)
            secondSet = sortWithPattern(secondSet, 2200);


            for (let i = 0; i < secondSet.length; i += 7) {
              let chunk = secondSet.slice(i, i + 7);
              secondSetFinal.push(chunk);
            }

          }



          if (firstSet.length > 0) {

            firstSet.sort((a, b) => a.content.length - b.content.length);

            let leftPosts = firstSet.length % 5;

            if (leftPosts !== 0 && zerothSet.length !== 0) {
              for (let i = 0; i < leftPosts; i += 1) {
                zerothSet.push(firstSet.pop(firstSet[i]))
              }
            }


            shuffleArray(firstSet)
            firstSet = sortWithPattern(firstSet, 3000);

            for (let i = 0; i < firstSet.length; i += 5) {
              let chunk = firstSet.slice(i, i + 5);
              firstSetFinal.push(chunk);
            }


          }


          if (zerothSet.length > 0) {
            for (let i = 0; i < zerothSet.length; i += 3) {
              let chunk = zerothSet.slice(i, i + 3);
              zerothSetFinal.push(chunk);
            }
          }

          // setLargerPosts(zerothSetFinal)
          // setLargePosts(firstSetFinal)
          // setMediumPosts(secondSetFinal)
          // setSemiMediumPosts(thirdSetFinal)
          // setSmallPosts(fourthSetFinal)
          // setSmallerPosts(fifthSetFinal)

          return {
            id,
            posts: {
              profile: newProfile,
              smallerPosts: fifthSetFinal,
              smallPosts: fourthSetFinal,
              semiMediumPosts: thirdSetFinal,
              mediumPosts: secondSetFinal,
              largePosts: firstSetFinal,
              largerPosts: zerothSetFinal,
            }
          };
        });


        const fetchedData = await Promise.all(fetchPostPromises);
        fetchedData.forEach(({ id, posts }) => {
          temp.push({ ...posts });
        });

        setPersons(temp)


        setLoading(false);


      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);



  if (loading || data === null) {
    <Document>
      Akash
    </Document>
  }




  return (

    <Document>


      <>
      {profile &&
          <Page size="A4" style={styles.page}>
          <View style={stylesProfile.section}>
           <Image src={bg} style={stylesProfile.backgroundImg} />
          
            <View style={stylesProfile.contentContiner}>
            <view style={stylesProfile.heading}>
              <Image src={yb_logo} style={stylesProfile.yb_logo}/>
              <Text style={stylesProfile.series}>SERIES</Text>
            </view>
            <view style={stylesProfile.contentContainer}>
              <View style={stylesProfile.leftContainer}>
                {profile.profile_image && (
                  <Image
                    src={`${profile.profile_image}`}
                    style={stylesProfile.leftImage}
                  />
                )}
              </View>
              <View style={stylesProfile.rightContainer}>
                <Text style={[stylesProfile.text, stylesProfile.nameText]}>{profile.name}</Text>
                <Text style={[stylesProfile.text, stylesProfile.nicknameText]}>Nickname: {profile.nickname}</Text>
                <Text style={[stylesProfile.text, stylesProfile.dobText]}>DoB: {profile.dob}</Text>
                <Text style={[stylesProfile.text, stylesProfile.emailText]}>Email: {profile.email}</Text>
                <Text style={[stylesProfile.text, stylesProfile.hostelText]}>Hostel: {profile.hostel}</Text>
                <Text style={[stylesProfile.text, stylesProfile.room_noText]}>Room No: {profile.room_no}</Text>
                <Text style={[stylesProfile.text, stylesProfile.departmentText]}>Department: {profile.department.split("&")[0]}</Text>
                {/* <Text style={[stylesProfile.text, stylesProfile.programText]}>Program: {profile.program}</Text> */}
                <Text style={[stylesProfile.text, stylesProfile.degreeText]}>Degree: {profile.degree}</Text>
                <Text style={[stylesProfile.text, stylesProfile.join_yearText]}>Joining Year: {profile.join_year}</Text>
                <Text style={[stylesProfile.text, stylesProfile.graduation_yearText]}>Graduation Year: {profile.graduation_year}</Text>
                {/* <Text style={[stylesProfile.text, stylesProfile.careerText]}>Career: {profile.career}</Text> */}
                {profile.tagline && (
                  <Text style={[stylesProfile.text, stylesProfile.taglineText]}>Tagline: {profile.tagline}</Text>
                )}
              </View>
            </view>  
            </View>

            <View style={stylesProfile.container}>
              <View style={stylesProfile.gradientBox} />
              <View style={stylesProfile.imageRow}>
                <View style={stylesProfile.imageContainer}>
                  {profile.img1 && (
                    <Image
                      src={`${profile.img1}`}
                      style={stylesProfile.leftImage1}
                    />
                  )}
                </View>
                <View style={stylesProfile.imageContainer2}>
                  {profile.img2 && (
                    <Image
                      src={`${profile.img2}`}
                      style={stylesProfile.leftImage1}
                    />
                  )}
                </View>
              </View>

              <View style={stylesProfile.imageRow}>
                <View style={stylesProfile.imageContainer}>
                  {profile.img3 && (
                    <Image
                      src={`${profile.img3}`}
                      style={stylesProfile.leftImage1}
                    />
                  )}
                </View>
                <View style={stylesProfile.imageContainer2}>
                  {profile.img4 && (
                    <Image
                      src={`${profile.img4}`}
                      style={stylesProfile.leftImage1}
                    />
                  )}
                </View>
              </View>
            </View>



          </View>
        </Page>
        }

        {smallerPosts && smallerPosts.map((posts, index) => {

          return <Page size="A4" style={styles.page}>
            <View key={index} style={styles.section}>
              {/* <Image src={background} style={styles.backgroundImg} /> */}
              <View style={styles.containerr}>

                {posts.map((postSet) => {
                  return <View style={styles.smallerPostsContaner}>
                    {postSet.map((post) => {
                      return <View key={post.id} style={styles.smallerPostContainer}>
                        <View style={{ padding: "4%" }}>
                          <Image src={post.is_anonymous
                            ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `${post.written_by_profile.profile_image}`} style={styles.smallerProfilePic} />
                        </View>
                        <View style={[styles.textContainer, { width: "120% !important" }]}>
                          <Text style={styles.content}>{post.content}</Text>
                          <View style={{ width: "100%", position: "relative" }}>
                            <Text style={[{ color: "white" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                          </View>
                        </View>
                      </View>
                    })}
                  </View>
                })}

              </View>
            </View>
          </Page>
        })}



        {smallPosts && smallPosts.length !== 0 && smallPosts.map((posts, index) => {
          let color = ["white"];

          function randomColor() {
            return color[Math.floor(Math.random() * color.length)];
          }

          return <Page size="A4" style={styles.page}>
          <View key={index} style={styles.section}>
            {/* <Image src={background} style={styles.backgroundImg} /> */}
            <View style={styles.container}>
            {/* <Image src={background} style={styles.backgroundImg} /> */}
            <View style={{height: "5%", width: '100%', margin: '0', padding: '0', flexShrink: 0, flexGrow: 0, flexBasis: 'auto'}}>
                <View style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                  <View style={{height:'100%',width:'20%'}}>
                    <Image src={logooo}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>
                  <View style={{height:'100%',width:'70%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  {profile && <Text style={{color: 'white', textAlign: 'center',fontSize: 14,
    fontWeight: 700,
    color: "#ffffff",
    fontFamily: "Roboto",}}>{profile.name.split(' ')[0].toUpperCase()}'S COLLEGE LIFE, FEATURING:</Text>}

                  </View>
                  <View style={{height:'100%',width:'10%'}}>
                    <Image src={side}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>

                </View>
                    </View>
     <View style={{height:'95%'}}>

                  {posts &&
                    posts.map((post, key) => {
                      const leftPost = key % 2 === 0;
                      return (
                        <View key={post.id}>
                          {leftPost && (
                            <View style={[styles.postContainer, styles.smallHeight,styles.l]}>
                              <View styles={styles.imageContainer}>
                                <Image src={post.is_anonymous
                                  ? "https://avatars.githubusercontent.com/u/16786985?v=4" : (`https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`)} style={[styles.profilePicLeft, styles.smallProfilePic]} />
                              </View>
                              <View style={[styles.textContainer, styles.smallWidth]}>
                                <Text style={styles.content}>{post.content}</Text>
                                <View style={{ width: "100%", position: "relative" }}>

                                  <Text style={[{ color: "white" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`} {!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />} </Text>
                                </View>
                              </View>
                            </View>
                          )}

                          {!leftPost && (
                            <View style={[styles.postContainer, styles.smallHeight,styles.r]}>
                              <View style={[styles.textContainerRight, styles.smallWidth]}>
                                <Text style={styles.content}>{post.content}</Text>
                                <View style={{ width: "100%", position: "relative" }}>
                                  <Text style={[{ color: "white" }, styles.smallProfileTextr]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                </View>
                              </View>
                              <View styles={styles.imageContainerRight}>
                                <Image src={post.is_anonymous
                                  ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.smallProfilePic]} />
                              </View>
                            </View>
                          )}
                        </View>
                      );
                    })}
                </View>
              </View>
            </View>
          </Page>
        })}


        {semiMediumPosts && semiMediumPosts.length !== 0 && semiMediumPosts.map((posts, index) => {
          let color = ["#9A2617", "#865dff", "#C2571A"];

          function randomColor() {
            return color[Math.floor(Math.random() * color.length)];
          }

          return <Page size="A4" style={styles.page}>
            <View key={index} style={styles.section}>
              {/* <Image src={background} style={styles.backgroundImg} /> */}
              <View style={styles.container}>
              {/* <Image src={background} style={styles.backgroundImg} /> */}
            <View style={{height: "5%", width: '100%', margin: '0', padding: '0', flexShrink: 0, flexGrow: 0, flexBasis: 'auto'}}>
                <View style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                  <View style={{height:'100%',width:'20%'}}>
                    <Image src={logooo}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>
                  <View style={{height:'100%',width:'70%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  {profile && <Text style={{color: 'white', textAlign: 'center',fontSize: 14,
    fontWeight: 700,
    color: "#ffffff",
    fontFamily: "Roboto",}}>{profile.name.split(' ')[0].toUpperCase()}'S COLLEGE LIFE, FEATURING:</Text>}

                  </View>
                  <View style={{height:'100%',width:'10%'}}>
                    <Image src={side}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>

                </View>
                    </View>
     <View style={{height:'95%'}}>


                  {posts &&
                    posts.map((post, key) => {
                      const leftPost = key % 2 === 0;
                      return (
                        <View key={post.id}>
                          {leftPost && (
                            <View style={[styles.postContainer, styles.semiMediumHeight,styles.l]}>
                              <View styles={styles.imageContainer}>
                                <Image src={post.is_anonymous
                                  ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicLeft, styles.semiMediumProfilePic]} />
                              </View>
                              <View style={[styles.textContainer, styles.semiMediumWidth]}>
                                <Text style={styles.content}>{post.content}</Text>
                                <View style={{ width: "100%", position: "relative" }}>
                                  <Text style={[{ color: "white" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`} {!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />} </Text>
                                </View>
                              </View>
                            </View>
                          )}

                          {!leftPost && (
                            <View style={[styles.postContainer, styles.semiMediumHeight,styles.r]}>
                              <View style={[styles.textContainerRight, styles.semiMediumWidth]}>
                                <Text style={styles.content}>{post.content}</Text>
                                <View style={{ width: "100%", position: "relative" }}>
                                  <Text style={[{ color: "white" }, styles.smallProfileTextr]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`} {!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                </View>
                              </View>
                              <View styles={styles.imageContainerRight}>
                                <Image src={post.is_anonymous
                                  ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.semiMediumProfilePic]} />
                              </View>
                            </View>
                          )}
                        </View>
                      );
                    })}
                </View>
              </View>
            </View>
          </Page>
        })}



        {mediumPosts && mediumPosts.length !== 0 && mediumPosts.map((posts, index) => {
          let color = ["#9A2617", "#865dff", "#C2571A"];

          function randomColor() {
            return color[Math.floor(Math.random() * color.length)];
          }

          return <Page size="A4" style={styles.page}>
            <View key={index} style={styles.section}>
              {/* <Image src={background} style={styles.backgroundImg} /> */}
              <View style={styles.container}>
              {/* <Image src={background} style={styles.backgroundImg} /> */}
            <View style={{height: "5%", width: '100%', margin: '0', padding: '0', flexShrink: 0, flexGrow: 0, flexBasis: 'auto'}}>
                <View style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                  <View style={{height:'100%',width:'20%'}}>
                    <Image src={logooo}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>
                  <View style={{height:'100%',width:'70%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  {profile && <Text style={{color: 'white', textAlign: 'center',fontSize: 14,
    fontWeight: 700,
    color: "#ffffff",
    fontFamily: "Roboto",}}>{profile.name.split(' ')[0].toUpperCase()}'S COLLEGE LIFE, FEATURING:</Text>}

                  </View>
                  <View style={{height:'100%',width:'10%'}}>
                    <Image src={side}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>

                </View>
                    </View>
     <View style={{height:'95%'}}>


                  {posts &&
                    posts.map((post, key) => {
                      const leftPost = key % 2 === 0;
                      return (
                        <View key={post.id}>
                          {leftPost && (
                            <View style={[styles.postContainer, styles.mediumHeight,styles.l]}>
                              <View styles={styles.imageContainer}>
                                <Image src={post.is_anonymous
                                  ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicLeft, styles.mediumProfilePic]} />
                              </View>
                              <View style={[styles.textContainer, styles.mediumWidth]}>
                                <Text style={styles.content}>{post.content}</Text>
                                <View style={{ width: "100%", position: "relative" }}>
                                  <Text style={[{ color: "white" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                </View>
                              </View>
                            </View>
                          )}

                          {!leftPost && (
                            <View style={[styles.postContainer, styles.mediumHeight,styles.r]}>
                              <View style={[styles.textContainerRight, styles.mediumWidth]}>
                                <Text style={styles.content}>{post.content}</Text>
                                <View style={{ width: "100%", position: "relative" }}>
                                  <Text style={[{ color: "white" }, styles.smallProfileTextr]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                </View>
                              </View>
                              <View styles={styles.imageContainerRight}>
                                <Image src={post.is_anonymous
                                  ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.mediumProfilePic]} />
                              </View>
                            </View>
                          )}
                        </View>
                      );
                    })}
                </View>
              </View>
            </View>
          </Page>
        })}




        {largePosts && largePosts.length !== 0 && largePosts.map((posts, index) => {
          let color = ["#9A2617", "#865dff", "#C2571A"];

          function randomColor() {
            return color[Math.floor(Math.random() * color.length)];
          }

          return <Page size="A4" style={styles.page}>
          <View key={index} style={styles.section}>
            {/* <Image src={background} style={styles.backgroundImg} /> */}
            <View style={styles.container}>
            <View style={{height: "5%", width: '100%', margin: '0', padding: '0', flexShrink: 0, flexGrow: 0, flexBasis: 'auto'}}>
                <View style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                  <View style={{height:'100%',width:'20%'}}>
                    <Image src={logooo}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>
                  <View style={{height:'100%',width:'70%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  {profile && <Text style={{color: 'white', textAlign: 'center',fontSize: 14,
    fontWeight: 700,
    color: "#ffffff",
    fontFamily: "Roboto",}}>{profile.name.split(' ')[0].toUpperCase()}'S COLLEGE LIFE, FEATURING:</Text>}

                  </View>
                  <View style={{height:'100%',width:'10%'}}>
                    <Image src={side}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>

                </View>
                    </View>
     <View style={{height:'95%'}}>

                  {posts &&
                    posts.map((post, key) => {
                      const leftPost = key % 2 === 0;
                      return (
                        <View key={post.id}>
                          {leftPost && (
                            <View style={[styles.postContainer, styles.largeHeight,styles.l]}>
                              <View styles={styles.imageContainer}>
                                <Image src={post.is_anonymous
                                  ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicLeft, styles.largeProfilePic]} />
                              </View>
                              <View style={[styles.textContainer, styles.largeWidth]}>
                                <Text style={styles.content}>{post.content}</Text>
                                <View style={{ width: "100%", position: "relative" }}>
                                  <Text style={[{ color: "white" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                </View>
                              </View>
                            </View>
                          )}

                          {!leftPost && (
                            <View style={[styles.postContainer, styles.largeHeight,styles.r]}>
                              <View style={[styles.textContainerRight, styles.largeWidth]}>
                                <Text style={styles.content}>{post.content}</Text>
                                <View style={{ width: "100%", position: "relative" }}>
                                  <Text style={[{ color: "white" }, styles.smallProfileTextr]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                </View>
                              </View>
                              <View styles={styles.imageContainerRight}>
                                <Image src={post.is_anonymous
                                  ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.largeProfilePic]} />
                              </View>
                            </View>
                          )}
                        </View>
                      );
                    })}
                </View>
              </View>
            </View>
          </Page>
        })}





        {largerPosts && largerPosts.length !== 0 && largerPosts.map((posts, index) => {
          let color = ["#9A2617", "#865dff", "#C2571A"];

          function randomColor() {
            return color[Math.floor(Math.random() * color.length)];
          }

          return <Page size="A4" style={styles.page}>
          <View key={index} style={styles.section}>
          <View style={styles.container}>
            {/* <Image src={background} style={styles.backgroundImg} /> */}
            <View style={{height: "5%", width: '100%', margin: '0', padding: '0', flexShrink: 0, flexGrow: 0, flexBasis: 'auto'}}>
                <View style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                  <View style={{height:'100%',width:'20%'}}>
                    <Image src={logooo}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>
                  <View style={{height:'100%',width:'70%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  {profile && <Text style={{color: 'white', textAlign: 'center',fontSize: 14,
    fontWeight: 700,
    color: "#ffffff",
    fontFamily: "Roboto",}}>{profile.name.split(' ')[0].toUpperCase()}'S COLLEGE LIFE, FEATURING:</Text>}

                  </View>
                  <View style={{height:'100%',width:'10%'}}>
                    <Image src={side}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>

                </View>
                    </View>
     <View style={{height:'95%'}}>

                  {posts &&
                    posts.map((post, key) => {
                      const leftPost = key % 2 === 0;
                      return (
                        <View key={post.id}>
                          {leftPost && (
                            <View style={[styles.postContainer, styles.largerHeight,styles.l]}>
                              <View styles={styles.imageContainer}>
                                <Image src={post.is_anonymous
                                  ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicLeft, styles.largerProfilePic]} />
                              </View>
                              <View style={[styles.textContainer, styles.largerWidth]}>
                                <Text style={styles.content}>{post.content}</Text>
                                <View style={{ width: "100%", position: "relative" }}>
                                  <Text style={[{ color: "white" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                </View>
                              </View>
                            </View>
                          )}

                          {!leftPost && (
                            <View style={[styles.postContainer, styles.largerHeight,styles.r]}>
                              <View style={[styles.textContainerRight, styles.largerWidth]}>
                                <Text style={styles.content}>{post.content}</Text>
                                <View style={{ width: "100%", position: "relative" }}>
                                  <Text style={[{ color: "white" }, styles.smallProfileTextr]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                </View>
                              </View>
                              <View styles={styles.imageContainerRight}>
                                <Image src={post.is_anonymous
                                  ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.largerProfilePic]} />
                              </View>
                            </View>
                          )}
                        </View>
                      );
                    })}
                </View>
              </View>
            </View>
          </Page>
        })}
      </>

      {persons && persons.map((person, index) =>
        <>
          {person.profile &&
            <Page size="A4" style={styles.page}>
            <View style={stylesProfile.section}>
             {/* <Image src={background} style={stylesProfile.backgroundImg} /> */}
            
              <View style={stylesProfile.contentContiner}>
              <view style={stylesProfile.heading}>
                <Image src={yb_logo} style={stylesProfile.yb_logo}/>
                <Text style={stylesProfile.series}>SERIES</Text>
              </view>
              <view style={stylesProfile.contentContainer}>
                <View style={stylesProfile.leftContainer}>
                  {person.profile.profile_image && (
                    <Image
                      src={`${person.profile.profile_image}`}
                      style={stylesProfile.leftImage}
                    />
                  )}
                </View>
                <View style={stylesProfile.rightContainer}>
                  <Text style={[stylesProfile.text, stylesProfile.nameText]}>{person.profile.name}</Text>
                  <Text style={[stylesProfile.text, stylesProfile.nicknameText]}>Nickname: {person.profile.nickname}</Text>
                  <Text style={[stylesProfile.text, stylesProfile.dobText]}>DoB: {person.profile.dob}</Text>
                  <Text style={[stylesProfile.text, stylesProfile.emailText]}>Email: {person.profile.email}</Text>
                  <Text style={[stylesProfile.text, stylesProfile.hostelText]}>Hostel: {person.profile.hostel}</Text>
                  <Text style={[stylesProfile.text, stylesProfile.room_noText]}>Room No: {person.profile.room_no}</Text>
                  <Text style={[stylesProfile.text, stylesProfile.departmentText]}>Department: {person.profile.department.split("&")[0]}</Text>
                  {/* <Text style={[stylesProfile.text, stylesProfile.programText]}>Program: {profile.program}</Text> */}
                  <Text style={[stylesProfile.text, stylesProfile.degreeText]}>Degree: {person.profile.degree}</Text>
                  <Text style={[stylesProfile.text, stylesProfile.join_yearText]}>Joining Year: {person.profile.join_year}</Text>
                  <Text style={[stylesProfile.text, stylesProfile.graduation_yearText]}>Graduation Year: {person.profile.graduation_year}</Text>
                  {/* <Text style={[stylesProfile.text, stylesProfile.careerText]}>Career: {profile.career}</Text> */}
                  {profile.tagline && (
                    <Text style={[stylesProfile.text, stylesProfile.taglineText]}>Tagline: {person.profile.tagline}</Text>
                  )}
                </View>
              </view>  
              </View>

              <View style={stylesProfile.container}>
                <View style={stylesProfile.gradientBox} />
                <View style={stylesProfile.imageRow}>
                  <View style={stylesProfile.imageContainer}>
                    {profile.img1 && (
                      <Image
                        src={`${person.profile.img1}`}
                        style={stylesProfile.leftImage1}
                      />
                    )}
                  </View>
                  <View style={stylesProfile.imageContainer2}>
                    {profile.img2 && (
                      <Image
                        src={`${person.profile.img2}`}
                        style={stylesProfile.leftImage1}
                      />
                    )}
                  </View>
                </View>

                <View style={stylesProfile.imageRow}>
                  <View style={stylesProfile.imageContainer}>
                    {profile.img3 && (
                      <Image
                        src={`${person.profile.img3}`}
                        style={stylesProfile.leftImage1}
                      />
                    )}
                  </View>
                  <View style={stylesProfile.imageContainer2}>
                    {profile.img4 && (
                      <Image
                        src={`${person.profile.img4}`}
                        style={stylesProfile.leftImage1}
                      />
                    )}
                  </View>
                </View>
              </View>



            </View>
          </Page>
          }

          {person.smallerPosts && person.smallerPosts.map((posts, index) => {

            return <Page size="A4" style={styles.page}>
              <View key={index} style={styles.section}>
                {/* <Image src={background} style={styles.backgroundImg} /> */}
                <View style={styles.containerr}>

                  {posts.map((postSet) => {
                    return <View style={styles.smallerPostsContaner}>
                      {postSet.map((post) => {
                        return <View key={post.id} style={styles.smallerPostContainer}>
                          <View style={{ padding: "4%" }}>
                            <Image src={post.is_anonymous
                              ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={styles.smallerProfilePic} />
                          </View>
                          <View style={[styles.textContainer, { width: "120% !important" }]}>
                            <Text style={styles.content}>{post.content}</Text>
                            <View style={{ width: "100%", position: "relative" }}>
                              <Text style={[{ color: "white" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                            </View>
                          </View>
                        </View>
                      })}
                    </View>
                  })}

                </View>
              </View>
            </Page>
          })}



          {person.smallPosts && person.smallPosts.length !== 0 && person.smallPosts.map((posts, index) => {
            let color = ["white"];

            function randomColor() {
              return color[Math.floor(Math.random() * color.length)];
            }

            return <Page size="A4" style={styles.page}>


          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
        

            <View style={styles.container}>
            <View style={{height: "5%", width: '100%', margin: '0', padding: '0', flexShrink: 0, flexGrow: 0, flexBasis: 'auto'}}>
                <View style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                  <View style={{height:'100%',width:'20%'}}>
                    <Image src={logooo}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>
                  <View style={{height:'100%',width:'70%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  {profile && <Text style={{color: 'white', textAlign: 'center',fontSize: 14,
    fontWeight: 700,
    color: "#ffffff",
    fontFamily: "Roboto",}}>{person.profile.name.split(' ')[0].toUpperCase()}'S COLLEGE LIFE, FEATURING:</Text>}

                  </View>
                  <View style={{height:'100%',width:'10%'}}>
                    <Image src={side}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>

                </View>
                    </View>
     <View style={{height:'95%'}}>

                    {posts &&
                      posts.map((post, key) => {
                        const leftPost = key % 2 === 0;
                        return (
                          <View key={post.id}>
                            {leftPost && (
                              <View style={[styles.postContainer, styles.smallHeight,styles.l]}>
                                <View styles={styles.imageContainer}>
                                  <Image src={post.is_anonymous
                                    ? "https://avatars.githubusercontent.com/u/16786985?v=4" : (`https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`)} style={[styles.profilePicLeft, styles.smallProfilePic]} />
                                </View>
                                <View style={[styles.textContainer, styles.smallWidth]}>
                                  <Text style={styles.content}>{post.content}</Text>
                                  <View style={{ width: "100%", position: "relative" }}>

                                    <Text style={[{ color: "white" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`} {!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />} </Text>
                                  </View>
                                </View>
                              </View>
                            )}

                            {!leftPost && (
                              <View style={[styles.postContainer, styles.smallHeight,styles.r]}>
                                <View style={[styles.textContainerRight, styles.smallWidth]}>
                                  <Text style={styles.content}>{post.content}</Text>
                                  <View style={{ width: "100%", position: "relative" }}>
                                    <Text style={[{ color: "white" }, styles.smallProfileTextr]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                  </View>
                                </View>
                                <View styles={styles.imageContainerRight}>
                                  <Image src={post.is_anonymous
                                    ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.smallProfilePic]} />
                                </View>
                              </View>
                            )}
                          </View>
                        );
                      })}
                  </View>
                </View>
              </View>
            </Page>
          })}


          {person.semiMediumPosts && person.semiMediumPosts.length !== 0 && person.semiMediumPosts.map((posts, index) => {
            let color = ["#9A2617", "#865dff", "#C2571A"];

            function randomColor() {
              return color[Math.floor(Math.random() * color.length)];
            }

            return <Page size="A4" style={styles.page}>


          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
        

            <View style={styles.container}>
            <View style={{height: "5%", width: '100%', margin: '0', padding: '0', flexShrink: 0, flexGrow: 0, flexBasis: 'auto'}}>
                <View style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                  <View style={{height:'100%',width:'20%'}}>
                    <Image src={logooo}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>
                  <View style={{height:'100%',width:'70%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  {profile && <Text style={{color: 'white', textAlign: 'center',fontSize: 14,
    fontWeight: 700,
    color: "#ffffff",
    fontFamily: "Roboto",}}>{person.profile.name.split(' ')[0].toUpperCase()}'S COLLEGE LIFE, FEATURING:</Text>}

                  </View>
                  <View style={{height:'100%',width:'10%'}}>
                    <Image src={side}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>

                </View>
                    </View>
     <View style={{height:'95%'}}>
                    {posts &&
                      posts.map((post, key) => {
                        const leftPost = key % 2 === 0;
                        return (
                          <View key={post.id}>
                            {leftPost && (
                              <View style={[styles.postContainer, styles.semiMediumHeight,styles.l]}>
                                <View styles={styles.imageContainer}>
                                  <Image src={post.is_anonymous
                                    ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicLeft, styles.semiMediumProfilePic]} />
                                </View>
                                <View style={[styles.textContainer, styles.semiMediumWidth]}>
                                  <Text style={styles.content}>{post.content}</Text>
                                  <View style={{ width: "100%", position: "relative" }}>
                                    <Text style={[{ color: "white" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`} {!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />} </Text>
                                  </View>
                                </View>
                              </View>
                            )}

                            {!leftPost && (
                              <View style={[styles.postContainer, styles.semiMediumHeight,styles.r]}>
                                <View style={[styles.textContainerRight, styles.semiMediumWidth]}>
                                  <Text style={styles.content}>{post.content}</Text>
                                  <View style={{ width: "100%", position: "relative" }}>
                                    <Text style={[{ color: "white" }, styles.smallProfileTextr]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`} {!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                  </View>
                                </View>
                                <View styles={styles.imageContainerRight}>
                                  <Image src={post.is_anonymous
                                    ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.semiMediumProfilePic]} />
                                </View>
                              </View>
                            )}
                          </View>
                        );
                      })}
                  </View>
                </View>
              </View>
            </Page>
          })}



          {person.mediumPosts && person.mediumPosts.length !== 0 && person.mediumPosts.map((posts, index) => {
            let color = ["#9A2617", "#865dff", "#C2571A"];

            function randomColor() {
              return color[Math.floor(Math.random() * color.length)];
            }

            return <Page size="A4" style={styles.page}>


          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
        

            <View style={styles.container}>
            <View style={{height: "5%", width: '100%', margin: '0', padding: '0', flexShrink: 0, flexGrow: 0, flexBasis: 'auto'}}>
                <View style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                  <View style={{height:'100%',width:'20%'}}>
                    <Image src={logooo}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>
                  <View style={{height:'100%',width:'70%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  {profile && <Text style={{color: 'white', textAlign: 'center',fontSize: 14,
    fontWeight: 700,
    color: "#ffffff",
    fontFamily: "Roboto",}}>{person.profile.name.split(' ')[0].toUpperCase()}'S COLLEGE LIFE, FEATURING:</Text>}

                  </View>
                  <View style={{height:'100%',width:'10%'}}>
                    <Image src={side}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>

                </View>
                    </View>
     <View style={{height:'95%'}}>

                    {posts &&
                      posts.map((post, key) => {
                        const leftPost = key % 2 === 0;
                        return (
                          <View key={post.id}>
                            {leftPost && (
                              <View style={[styles.postContainer, styles.mediumHeight,styles.l]}>
                                <View styles={styles.imageContainer}>
                                  <Image src={post.is_anonymous
                                    ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicLeft, styles.mediumProfilePic]} />
                                </View>
                                <View style={[styles.textContainer, styles.mediumWidth]}>
                                  <Text style={styles.content}>{post.content}</Text>
                                  <View style={{ width: "100%", position: "relative" }}>
                                    <Text style={[{ color: "white" }, styles.smallProfileTextr]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                  </View>
                                </View>
                              </View>
                            )}

                            {!leftPost && (
                              <View style={[styles.postContainer, styles.mediumHeight,styles.r]}>
                                <View style={[styles.textContainerRight, styles.mediumWidth]}>
                                  <Text style={styles.content}>{post.content}</Text>
                                  <View style={{ width: "100%", position: "relative" }}>
                                    <Text style={[{ color: "white" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                  </View>
                                </View>
                                <View styles={styles.imageContainerRight}>
                                  <Image src={post.is_anonymous
                                    ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.mediumProfilePic]} />
                                </View>
                              </View>
                            )}
                          </View>
                        );
                      })}
                  </View>
                </View>
              </View>
            </Page>
          })}




          {person.largePosts && person.largePosts.length !== 0 && person.largePosts.map((posts, index) => {
            let color = ["#9A2617", "#865dff", "#C2571A"];

            function randomColor() {
              return color[Math.floor(Math.random() * color.length)];
            }

            return <Page size="A4" style={styles.page}>


          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
        
            <View style={{height: "5%", width: '100%', margin: '0', padding: '0', flexShrink: 0, flexGrow: 0, flexBasis: 'auto'}}>
                <View style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                  <View style={{height:'100%',width:'20%'}}>
                    <Image src={logooo}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>
                  <View style={{height:'100%',width:'70%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  {profile && <Text style={{color: 'white', textAlign: 'center',fontSize: 14,
    fontWeight: 700,
    color: "#ffffff",
    fontFamily: "Roboto",}}>{person.profile.name.split(' ')[0].toUpperCase()}'S COLLEGE LIFE, FEATURING:</Text>}

                  </View>
                  <View style={{height:'100%',width:'10%'}}>
                    <Image src={side}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>

                </View>
                    </View>
     <View style={{height:'95%'}}>

                    {posts &&
                      posts.map((post, key) => {
                        const leftPost = key % 2 === 0;
                        return (
                          <View key={post.id}>
                            {leftPost && (
                              <View style={[styles.postContainer, styles.largeHeight,styles.l]}>
                                <View styles={styles.imageContainer}>
                                  <Image src={post.is_anonymous
                                    ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicLeft, styles.largeProfilePic]} />
                                </View>
                                <View style={[styles.textContainer, styles.largeWidth]}>
                                  <Text style={styles.content}>{post.content}</Text>
                                  <View style={{ width: "100%", position: "relative" }}>
                                    <Text style={[{ color: "white" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                  </View>
                                </View>
                              </View>
                            )}

                            {!leftPost && (
                              <View style={[styles.postContainer, styles.largeHeight,styles.r]}>
                                <View style={[styles.textContainerRight, styles.largeWidth]}>
                                  <Text style={styles.content}>{post.content}</Text>
                                  <View style={{ width: "100%", position: "relative" }}>
                                    <Text style={[{ color: "white" }, styles.smallProfileTextr]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                  </View>
                                </View>
                                <View styles={styles.imageContainerRight}>
                                  <Image src={post.is_anonymous
                                    ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.largeProfilePic]} />
                                </View>
                              </View>
                            )}
                          </View>
                        );
                      })}
                  </View>
                </View>
              {/* </View> */}
            </Page>
          })}





          {person.largerPosts && person.largerPosts.length !== 0 && person.largerPosts.map((posts, index) => {
            let color = ["#9A2617", "#865dff", "#C2571A"];

            function randomColor() {
              return color[Math.floor(Math.random() * color.length)];
            }

            return <Page size="A4" style={styles.page}>


          <View key={index} style={styles.section}>
            <Image src={background} style={styles.backgroundImg} />
        

            <View style={styles.container}>
            <View style={{height: "5%", width: '100%', margin: '0', padding: '0', flexShrink: 0, flexGrow: 0, flexBasis: 'auto'}}>
                <View style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                  <View style={{height:'100%',width:'20%'}}>
                    <Image src={logooo}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>
                  <View style={{height:'100%',width:'70%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                  {profile && <Text style={{color: 'white', textAlign: 'center',fontSize: 14,
    fontWeight: 700,
    color: "#ffffff",
    fontFamily: "Roboto",}}>{person.profile.name.split(' ')[0].toUpperCase()}'S COLLEGE LIFE, FEATURING:</Text>}

                  </View>
                  <View style={{height:'100%',width:'10%'}}>
                    <Image src={side}  style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}}></Image>
                  </View>

                </View>
                    </View>
     <View style={{height:'95%'}}>

                    {posts &&
                      posts.map((post, key) => {
                        const leftPost = key % 2 === 0;
                        return (
                          <View key={post.id}>
                            {leftPost && (
                              <View style={[styles.postContainer, styles.largerHeight,styles.l]}>
                                <View styles={styles.imageContainer}>
                                  <Image src={post.is_anonymous
                                    ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicLeft, styles.largerProfilePic]} />
                                </View>
                                <View style={[styles.textContainer, styles.largerWidth]}>
                                  <Text style={styles.content}>{post.content}</Text>
                                  <View style={{ width: "100%", position: "relative" }}>
                                    <Text style={[{ color: "white" }, styles.smallProfileText]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                  </View>
                                </View>
                              </View>
                            )}

                            {!leftPost && (
                              <View style={[styles.postContainer, styles.largerHeight,styles.r]}>
                                <View style={[styles.textContainerRight, styles.largerWidth]}>
                                  <Text style={styles.content}>{post.content}</Text>
                                  <View style={{ width: "100%", position: "relative" }}>
                                    <Text style={[{ color: "white" }, styles.smallProfileTextr]}> {`- ${post.is_anonymous ? post.written_by : post.written_by_profile.name}`}{!post.is_anonymous && post.written_by_profile.is_ib && <Image src={verified} style={styles.verified} />}</Text>
                                  </View>
                                </View>
                                <View styles={styles.imageContainerRight}>
                                  <Image src={post.is_anonymous
                                    ? "https://avatars.githubusercontent.com/u/16786985?v=4" : `https://yearbook.sarc-iitb.org${post.written_by_profile.profile_image}`} style={[styles.profilePicRight, styles.largerProfilePic]} />
                                </View>
                              </View>
                            )}
                          </View>
                        );
                      })}
                  </View>
                </View>
              </View>
            </Page>
          })}
        </>)}




      {true && <>
        <Page size="A4" style={stylesSigningOff.page}>
          <View style={stylesSigningOff.section}>
            <Image src={writeForYourself} style={stylesSigningOff.backgroundImg} />
          </View>
        </Page>


        {profile && <Page size="A4" style={stylesSigningOff.page}>
          <View style={stylesSigningOff.section}>
            <Image src={signingOff} style={stylesSigningOff.backgroundImg} />
            <Text style={stylesSigningOff.text}>{profile.name}</Text>
            <Text style={stylesSigningOff.rollno}>{profile.email.split("@")[0]}</Text>
          </View>
        </Page>}</>}



    </Document>

  );
};

export default PDFGenerator;



