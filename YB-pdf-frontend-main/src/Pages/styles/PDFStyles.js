import { StyleSheet } from "@react-pdf/renderer";

let color = ["black", "blue", "red", "yellow"];

function randomColor() {
  return color[Math.floor(Math.random() * color.length)];
}

export const styles = StyleSheet.create({

  name:{
    position: "absolute",
    top: "-1.3vh",
    right: "-1vh",
    fontSize: 12,
    fontWeight: 700,
    color: "#865dff",
    fontFamily: "Roboto",
  },
  page: {
    flexDirection: 'row',
  },

  backgroundImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  section: {
    position: "relative",
    zIndex: 2,
    flexGrow: 1,
  },

  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // transform: 'rotate(-10deg)',
    transformOrigin: "center center",
    height: 'auto',         
    fontFamily:'myriad',
    backgroundColor: '#6dd4de',
  },

  imageContainerRight: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // transform: 'rotate(10deg)',
    // transformOrigin: "center center",
    height: 'auto',  
    marginRight:'10%',
  },

  profilePicRight: {
    width: "70%",
    height: "70%",
    // transform: 'rotate(10deg)',
    transformOrigin: "center center",
    objectFit: "cover",
    // borderRadius: "6px",
    // marginRight:'1px',

  },

  profilePicRightX: {
    width: "70%",
    height: "70%",
    // transform: 'rotate(10deg)',
    transformOrigin: "center center",
    objectFit: "cover",
    // borderRadius: "6px",
    marginRight:'1%',

  },

  smallerProfilePic: {
    width: "0.7in",
    height: "0.7in",
    // transform: 'rotate(1deg)',
    transformOrigin: "center center",
    objectFit: "cover",
    // borderRadius: "6px",
  },

  smallerProfilePicc: {
    width: "1in",
    height: "1in",
    // transform: 'rotate(1deg)',
    transformOrigin: "center center",
    objectFit: "cover",
    // borderRadius: "6px",
  },


   profileTextRight:{
    fontSize: 15,
    textAlign: "center",
    margin: 5,
    marginLeft: -8,
    // transform: 'rotate(10deg)',
    transformOrigin: "center center",
  },

  profileTextLeft:{
    fontSize: 15,
    textAlign: "center",
    margin: 5,
    marginLeft: 25,
    // transform: 'rotate(-10deg)',
    transformOrigin: "center center"
  },

  smallerProfileText:{
    fontSize: 15,
    textAlign: "center",
    // transform: 'rotate(1deg)',
    transformOrigin: "center center"
  },
  profilePicLeft: {
    
    width: "1.7in",
    height: "1.7in",
    // transform: 'rotate(-10deg)',
    transformOrigin: "center center",
    objectFit: "cover",
    // borderRadius: "6px",
    // border: "5px solid red",
  },

 

  container: {
    display: "flex",
    paddingTop: "0",
    paddingBottom: "7vh",
    paddingLeft: "10%",
    paddingRight: "10%",
    height: "100vh",
    justifyContent: "space-between",
    padding: '20px',
    width: '100vw',
    backgroundColor: 'black',
    color: '#fff',
  },



  containerr: {
    display: "flex",
    paddingTop: "7vh",
    paddingBottom: "7vh",
    height: "100vh",
    justifyContent: "flex-start",
  },
  l:{
    // display: 'flex',
    // flexDirection: 'row', /* Keeps the image and text aligned horizontally */
    // justifyContent: 'space-evenly', /* Distributes space between elements */
    // alignItems: 'center', /* Vertically centers items within the container */
    // padding: '10px 10px 10px 0', /* Remove padding on the left side */
    // marginBottom: '10px',
    // marginTop: '5px',                                                                        //new
    // backgroundColor: '#333',                                                                //new
    // color: 'white',
    // borderLeft: '3px solid red', 
    // marginRight: 0,
    // width: '100%',
    // height:'auto',
    justifyContent: 'flex-start', /* Distributes space between elements */
    borderLeft: '3px solid red', 
  },
  r:{
    // display: 'flex',
    // flexDirection: 'row', /* Keeps the image and text aligned horizontally */
    // // justifyContent: 'space-evenly', /* Distributes space between elements */
    // alignItems: 'center', /* Vertically centers items within the container */
    // padding: '10px 10px 10px 0', /* Remove padding on the left side */
    // marginBottom: '10px',
    // marginTop: '5px',                                                                        //new
    // backgroundColor: '#333',                                                                //new
    // color: 'white',
    // borderRight: '3px solid red', 
    // marginRight: 0,
    // width: '100%',
    justifyContent: 'flex-end', /* Distributes space between elements */
    borderRight: '3px solid red', 

  },
  postContainer: {
    // display: 'flex',
    // flexDirection: 'row', /* Keeps the image and text aligned horizontally */
    // justifyContent: 'space-evenly', /* Distributes space between elements */
    // alignItems: 'center', /* Vertically centers items within the container */
    // padding: '10px 10px 10px 0', /* Remove padding on the left side */
    // marginBottom: '10px',
    // marginTop: '5px',                                                                        //new
    // backgroundColor: '#333',                                                                //new
    // color: 'white',
    // // borderLeft: '3px solid red', 
    // marginRight: 0,
    // width: '100%',
    display: 'flex',
    flexDirection: 'row', /* Keeps the image and text aligned horizontally */
    justifyContent: 'space-evenly', /* Distributes space between elements */
    alignItems: 'center', /* Vertically centers items within the container */
    padding: '0px', /* Remove padding on the left side */
    marginBottom: '10px',
    marginTop: '5px',                                                                        //new
    backgroundColor: '#333',                                                                //new
    color: 'white', 
    marginRight: 0,
    width: '100%',

  },
  left:{
    alignItems:'center',
  },

  // smallerPostContainer: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },

  smallHeight: {
    height: 'auto',
  },
  smallerHeight: {
    height: 'auto',
  },

  smallWidth: {
    width: "84%",
  },

  semiMediumHeight: {
    height: 'auto',
  },

  semiMediumWidth: {
    width: "82%",
  },

  mediumHeight: {
    height: 'auto',
  },

  mediumWidth: {
    width: "84.5%",
  },

  largeHeight: {
    height: 'auto',
  },

  apniHeight: {
    height: 'auto',
  },

  largeWidth: {
    width: "84.5%",
  },

  largerHeight: {
    height: 'auto',
  },

  largerWidth: {
    width: "84.5%",
  },



  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginLeft: '3%',
    fontFamily:'myriad',
    // backgroundColor: '#42fac0',
    height: '100%',
    width: '100%',
    paddingLeft:'2%',
    paddingRight:'2%',
    paddingTop:'1%',
    paddingBottom:'1%',
    textAlign: 'justify',
  },


  textContainerRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontFamily:'myriad',
    textAlign: 'justify',
    // backgroundColor: '#42fac0',
    height: '100%',
    width: '100%',
  marginRight   :'3%',
  paddingLeft:'2%',
  paddingRight:'2%',
  paddingTop:'1%',
  paddingBottom:'1%',

  },


  content: {
    fontSize: 8.5,
    fontFamily: "Roboto",
    // fontStyle: "normal",
    // fontWeight: 400,
  },





  smallerPostsContaner: {
    display: "flex",
    width: "100vw",
    paddingLeft: "7vw",
    paddingRight: "7vw",
    flexDirection: "row",
    justifyContent: "space-between"
  },


  smallerPostsContanerr: {
    display: "flex",
    width: "80vw",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  smallerPostContainer: {
    width: "43vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0.5in",
  },

  smallerPostContainerr: {
    width: "40vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0.5in",
  },


  smallerTextContainer: {
    display: "flex",
  },


  smallerPostsImage: {
    width: "1.7in",
    height: "1.7in",
    objectFit: "cover"
  },

  smallerPostsText: {
    fontSize: 12,
  },

  smallerPostsContent: {
    width: "100%"
  },

  smallProfilePic:{
    width: "0.7in",
    height: "0.7in",
  },

  smallProfilePicX:{
    width: "0.5in",
    height: "0.5in",
  },

  semiMediumProfilePic:{
    width: "0.7in",
    height: "0.7in",
  },

  mediumProfilePic:{
    width: "0.7in",
    height: "0.7in",
  },


  largeProfilePic:{
    width: "1in",
    height: "1in",
  },

  largerProfilePic: {
    width: "1in",
    height: "1in",
  },


  // smallProfileText:{
  //   // position: "absolute",
  //   // fontSize: 10,
  //   // fontFamily: "Comic",
  //   // fontWeight: 700,
  //   // fontStyle: "italic",
  //   // marginBottm: 10,
  //   // right: 0,
  //   position: 'relative',
  //   left: '75%',
  //   fontSize: 10,
  //   fontFamily: "Comic",
  //   // fontWeight: 700,
  //   // fontStyle: "italic",
  //   marginTop: '5px',

  // },
  smallProfileText:{
    // position: "absolute",
    // fontSize: 10,
    // fontFamily: "Comic",
    // fontWeight: 700,
    // fontStyle: "italic",
    // marginBottm: 10,
    // right: 0,
    position: 'relative',
    left: '37%',
    fontSize: 10,
    fontFamily: "mayraid",
    fontWeight: 700,
    fontStyle: "italic",
    marginTop: '5px',
    fontSize: 8.5,
    fontFamily: "Roboto",
    // textAlign:'center'

  },
  // smallProfileTextr:{
    // position: "absolute",
    // fontSize: 10,
    // fontFamily: "Comic",
    // fontWeight: 700,
    // fontStyle: "italic",
    // marginBottm: 0,
    // left: 0,
    // smallProfileTextr:{
    //   // position:'absolute',
    //   fontSize: 10,
    //   fontFamily: "Comic",
    //   // fontWeight: 700,
    //   // fontStyle: "italic",
    //   marginTop: '5px'
    // } ,
    smallProfileTextr:{
      position:'relative',
      fontSize: 10,
      fontFamily: "Comic",
      fontWeight: 700,
      fontStyle: "italic",
      marginTop: '5px',
      left:'45%',
      fontSize: 8.5,
    fontFamily: "Roboto",
    } ,
  
  // mediumProfileText:{
  //   fontSize: 11,
  // },

  // largeProfileText:{
  //   fontSize: 12,
  // },


  verified: {
    width: "0.1in",
    height: "0.1in",
  }



});