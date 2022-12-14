import React,{ useState,useEffect } from 'react';
import MenuSelectProductType from './MenuSelectProduct';
import MenuProductView from './MenuProductView';
import MenuPositions from './MenuPosition';
import AnimationBtn from './AnimationBtn';
import MenuFeatures from './MenuFeatures';
import MenuColors from './MenuColors';
import Howtousenew from './Howtousenew';
import HowToUse from './HowToUse';
import FooterControl from './FooterControl';
import FooterControlMob from './FooterControlMob';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';

// import MenuBtn from './MenuBtn';
// import { MicNone } from '@material-ui/icons';
var mob = (navigator.userAgent.indexOf("iPhone") != -1) || ((navigator.userAgent.indexOf("Android") != -1) || (navigator.userAgent.indexOf("Mobile") != -1)) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1) || (navigator.userAgent == "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Safari/605.1.15");
var mobPortrait = (mob && window.innerHeight > window.innerWidth);
var moblandscap = (mob && window.innerWidth > window.innerHeight);
var isipad = navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && (navigator.userAgent.indexOf("iPhone") == -1);

export const userContext = React.createContext();
var prevCounter = 0;
var nextClicked = false;
var prevClicked = false;
var buttonSeq = ['onResetMode','TentModeClick','TheaterModeClick','TabletModeClick','onFrontClick','onTopClick','onRightClick','onLeftClick','onBackClick','backliteClick','FPRClick','openCloseClick']; //backliteClick','FPRClick',onExplodeClick
var buttonSeq = ['onResetMode','TentModeClick','TheaterModeClick','TabletModeClick','onFrontClick','onTopClick','onRightClick','onLeftClick','onBackClick','backliteClick','FPRClick','openCloseClick']; //backliteClick','FPRClick',onExplodeClick
var buttonSeq180 = ['onResetMode','onFrontClick','onTopClick','onRightClick','onLeftClick','onBackClick','onExplodeClick','backliteClick','FPRClick','openCloseClick'];
var selectedButton = 'onResetMode';

var position = {
   'currentPos': 'reset',
   'close': 0.0416667,
   'nintyDegree': 1.0829999,
   'reset': 2.0833333,
   'top': 1.4160000,
   'exploaded': 3.1250000,
   'back': 1.125
}

const MainMenu = (props) => {
   const [expandedPanel,setExpandedPanel] = useState(false);
   const [displayed,setDisplayed] = useState(false);
   const [hidden,setHidden] = useState(true);
   const [laptop360FrontImg,setLaptop360FrontImg] = useState("./img/front360.png");
   const [laptop360TopImg,setLaptop360TopImg] = useState("./img/top360.png");
   const [laptop360LeftImg,setLaptop360LefttImg] = useState("./img/360_left.png");
   const [laptop360RightImg,setLaptop360RightImg] = useState("./img/360_right.png");
   const [laptop360BackImg,setLaptop360BackImg] = useState("./img/back.png");
   const [laptopExplodeImg,setLaptopExplodeImg] = useState("./img/explode.png");
   const [counter,setCounter] = useState(0);

   //   const [orientationPotrait, setOrientation] = useState(true);
   //   window.checkOrientationStatus = (orientationStatus) => 
   //   {
   //   //  alert(window.screen.orientation.type);
   //     setOrientation(orientationStatus);
   //  }

   const handleAccordionChange = (panel) => (event,isExpanded) => {
      // console.log({ event,isExpanded });
      //setExpandedPanel(isExpanded ? panel  : false );
      if (isExpanded) {
         setExpandedPanel(panel);
         //console.log("shubham");
      } else {
         //  console.log("Pawar");
         setExpandedPanel(false)
      };
      // resetBacklitCloseImg();

   };
   const [camData,setCamData] = useState("");
   var animationSwitch = window.localStorage.getItem('Animation');
   var animTime = 100;
   var animTimes = 1;
   // console.log(animTime);

   const getData = () => {
      fetch('./model_gl/config.json')
         .then(function (response) {
            return response.json();
         })
         .then(function (myJson) {
            // console.log(myJson.positions);
            setCamData(myJson.positions);
         });
   }
   useEffect(() => {
      getData();
      animationSwitch = window.localStorage.getItem('Animation');
      moblandscap = (mob && window.innerWidth > window.innerHeight);

      //window.localStorage.setItem('tent', false);
      //window.localStorage.setItem('tablet', false);
      //window.localStorage.setItem('theater', false);
      //window.localStorage.setItem('close', false);
      window.localStorage.setItem("position","reset");


      // document.getElementById('whiteBtn').classList.add('select');
      // window.xmlhttp.open("GET", "locale.json", true);
      // window.xmlhttp.send();
      // alert('moblandscap '+moblandscap )

   },[]);

   useEffect((event) => {
      if (event) {
         if (event.keyCode === 13) {
            this.click();
         }
      }
      return () => {
         return false
      }
   },[])


   //For Animation Switch 
   // console.log('animationSwitch anim', animationSwitch)

   if (animationSwitch == 'on') { animTime = 800; animTimes = 2000 }
   else { animTime = 1; animTimes = 1 }
   // console.log('animTime', animTime)

   //new camera function
   const GotoPosInTimeNamedValue = (gotoposname,onComplete,onSample) => {
   
      // console.log(gotoposname + "check")
      // below code is updated in it.  
      // updated code ends here

      var opt = undefined,gp = camData[gotoposname];
      // console.log('gotopose',gp)
      //    console.log(gp)
      if (gp.fovy && window.scene.fovy != gp.fovy)
         opt = { fovy: gp.fovy };
      if (gp.pos.length > 5) {
         if (!opt)
            opt = {};
         opt.zang = gp.pos[5];
      }
      // console.log('animationSwitch', animationSwitch)
      // if (animationSwitch == 'off') {
      //    gp.time = 1
      //    // console.log('animationSwitch iffff', gp.time)
      // }
      // else {
      //    gp.time = animTime;
      //    // console.log('animationSwitch elseeee', gp.time)
      // }
      // console.log('animationSwitch',animationSwitch);
      // console.log('gp.time',gp.time);
      // window.scene.gotoPosInTime(gp.pos[0],gp.pos[1],gp.pos[2],gp.pos[3],gp.pos[4],gp.time,onComplete,slowInOut,opt);
      // if ((mob || isipad)) {
      //    // if (gotoposname == "window.config.top" || gotoposname == "window.config.exploded" || gotoposname == "window.config.close") {

      //       window.scene.gotoPosInTime(gp.pos[0],gp.pos[1],gp.pos[2],gp.pos[3],gp.pos[4] * 1.2,gp.time,onComplete,slowInOut,opt);
      //    // }
      //    // else {

      //    //    window.scene.gotoPosInTime(gp.pos[0],gp.pos[1] * -0.0001,gp.pos[2],gp.pos[3],gp.pos[4] * 1.2,gp.time,onComplete,slowInOut,opt);
      //    // }

      // } else {
      // window.scene.gotoPosInTime(gp.pos[0],gp.pos[1],gp.pos[2],gp.pos[3],gp.pos[4],gp.time,onComplete,slowInOut,opt);
      // }


      // console.log(gp.pos[0], gp.pos[1], gp.pos[2], gp.pos[3], gp.pos[4], gp.time, onComplete, onSample, opt);
      // console.log(animTime)
      if (mob || isipad) {
         window.scene.gotoPosInTime(gp.pos[0],gp.pos[1],gp.pos[2],gp.pos[3],gp.pos[4] + 13,animTime,onComplete,onSample,opt);
      } else {
         window.scene.gotoPosInTime(gp.pos[0],gp.pos[1],gp.pos[2],gp.pos[3],gp.pos[4],animTime,onComplete,onSample,opt);
      }
   }
   //end
   const slowInOut = (x) => {
      var a = 2.1;
      var x2 = 1.0 - x;
      var px = Math.pow(x,a);
      var px2 = Math.pow(x2,a);

      return px / (px + px2);
   }


   const resetBacklitCloseImg = () => {
      setOpenCloseOnOff(false);
      setOpenClose("./img/Lid_open.svg");
      setBackliteOnOff(false);
      setBacklite("./img/Backlite_Off.svg");

      // window.scene.materialReplace('LED_Backlit_ON_env', 'LED_Backlit_OFF_env');
      window.scene.clearRefine();

   }
   // const resetTimeline1 = (revers90Degree = true) => {
   //    //window.scene.instanceSet("GP_Close_360", "visible", false);
   //    //window.scene.instanceSet("GP_Stand", "visible", false);
   //    //window.scene.instanceSet("GP_Tent", "visible", false);
   //    //window.scene.instanceSet("GP_Tablet", "visible", false);
   //    if (window.scene.animIsPlaying('Screen_90_degree')) window.scene.getAnim("Screen_90_degree").stop();
   //    if (window.scene.animIsPlaying('Screen_grp_timeline_01_A')) window.scene.getAnim("Screen_grp_timeline_01_A").stop();
   //    if (window.scene.animIsPlaying('Hinge_grp_timeline_01_A')) window.scene.getAnim("Hinge_grp_timeline_01_A").stop();
   //    if (window.scene.animIsPlaying('Main_grp_timeline_01_A')) window.scene.getAnim("Main_grp_timeline_01_A").stop();

   //    if (revers90Degree) {
   //       // window.scene.animPlayInTime("Screen_90_degree", 0, 0);
   //       // window.scene.animPlayInTime("Screen_90_to_close180", 0, 0);
   //       // window.scene.animPlayInTime("Screen_90_to_close360", 0, 0);
   //    }
   //    window.scene.animPlayInTime("Screen_grp_timeline_01_A",0,0);
   //    window.scene.animPlayInTime("Hinge_grp_timeline_01_A",0,0);
   //    window.scene.animPlayInTime("Main_grp_timeline_01_A",0,0);
   //    window.scene.clearRefine();
   // }
   // const resetTimeline2 = (revers90Degree = true) => {
   //    //window.scene.instanceSet("GP_Close_360", "visible", false);
   //    //window.scene.instanceSet("GP_Stand", "visible", false);
   //    //window.scene.instanceSet("GP_Tent", "visible", false);
   //    //window.scene.instanceSet("GP_Tablet", "visible", false);
   //    if (window.scene.animIsPlaying('Screen_90_degree')) window.scene.getAnim("Screen_90_degree").stop();
   //    if (window.scene.animIsPlaying('Screen_grp_timeline_02_A')) window.scene.getAnim("Screen_grp_timeline_02_A").stop();
   //    if (window.scene.animIsPlaying('Hinge_grp_timeline_02_A')) window.scene.getAnim("Hinge_grp_timeline_02_A").stop();
   //    if (window.scene.animIsPlaying('Main_grp_timeline_02_A')) window.scene.getAnim("Main_grp_timeline_02_A").stop();
   //    if (revers90Degree) {
   //       // window.scene.animPlayInTime('Screen_90_degree', 0, 0);
   //       // window.scene.animPlayInTime('Screen_90_degree_180', 0, 0);

   //    }
   //    window.scene.animPlayInTime("Screen_grp_timeline_02_A",0,0);
   //    window.scene.animPlayInTime("Hinge_grp_timeline_02_A",0,0);
   //    window.scene.animPlayInTime("Main_grp_timeline_02_A",0,0);
   //    window.scene.clearRefine();
   // }
   // const resetTimeline3 = (revers90Degree = true) => {
   //    //window.scene.instanceSet("GP_Close_360", "visible", false);
   //    //window.scene.instanceSet("GP_Stand", "visible", false);
   //    //window.scene.instanceSet("GP_Tent", "visible", false);
   //    //window.scene.instanceSet("GP_Tablet", "visible", false);
   //    if (window.scene.animIsPlaying('Screen_90_degree')) window.scene.getAnim("Screen_90_degree").stop();
   //    if (window.scene.animIsPlaying('Screen_grp_timeline_03_A')) window.scene.getAnim("Screen_grp_timeline_03_A").stop();
   //    if (window.scene.animIsPlaying('Hinge_grp_timeline_03_A')) window.scene.getAnim("Hinge_grp_timeline_03_A").stop();
   //    if (window.scene.animIsPlaying('Main_grp_timeline_03_A')) window.scene.getAnim("Main_grp_timeline_03_A").stop();
   //    if (revers90Degree) {
   //       // window.scene.animPlayInTime('Screen_90_degree', 0, 0);
   //       // window.scene.animPlayInTime('Screen_90_degree_180', 0, 0);

   //    }
   //    window.scene.animPlayInTime("Screen_grp_timeline_03_A",0,0);
   //    window.scene.animPlayInTime("Hinge_grp_timeline_03_A",0,0);
   //    window.scene.animPlayInTime("Main_grp_timeline_03_A",0,0);
   //    window.scene.clearRefine();
   // }
   // const resetTimeline4 = (revers90Degree = true) => {
   //    //window.scene.instanceSet("GP_Close_360", "visible", false);
   //    //window.scene.instanceSet("GP_Stand", "visible", false);
   //    //window.scene.instanceSet("GP_Tent", "visible", false);
   //    //window.scene.instanceSet("GP_Tablet", "visible", false);
   //    if (window.scene.animIsPlaying('Screen_90_degree')) window.scene.getAnim("Screen_90_degree").stop();
   //    if (window.scene.animIsPlaying('Main_grp_timeline_04_A')) window.scene.getAnim("Main_grp_timeline_04_A").stop();
   //    if (window.scene.animIsPlaying('Hinge_grp_timeline_04_A')) window.scene.getAnim("Hinge_grp_timeline_04_A").stop();
   //    if (window.scene.animIsPlaying('Screen_grp_timeline_04_A')) window.scene.getAnim("Screen_grp_timeline_04_A").stop();
   //    if (revers90Degree) {
   //       // window.scene.animPlayInTime('Screen_90_degree', 0, 0);
   //       // window.scene.animPlayInTime('Screen_90_degree_180', 0, 0);

   //    }
   //    window.scene.animPlayInTime("Main_grp_timeline_04_A",0,0);
   //    window.scene.animPlayInTime("Hinge_grp_timeline_04_A",0,0);
   //    window.scene.animPlayInTime("Screen_grp_timeline_04_A",0,0);
   //    window.scene.clearRefine();
   // }
   // const posClicked1 = () => {
   //    // window.localStorage.removeItem('hotspot');
   //    // window.localStorage.removeItem('color');
   //    window.scene.animPlayInTime("Screen_grp_timeline_01",0,animTime);

   // }


   //MenuSelectProduct
   // const [laptop360,setlaptop360] = useState(true);

   const [laptop180,setlaptop180] = useState(false);

   // const laptopClick = (event) => {

   //    setlaptop180(true);
   //    setlaptop360(false);
   //    // console.log(laptop180);
   //    setCounter(0);
   //    selectedButton = 'onResetMode';
   //    setValue(event.target.value);
   //    setDisplayed(true);
   //    // setExpandedPanel(false);
   //    setHidden(false);
   //    var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');

   //    if (alreadySelected != null) {
   //       alreadySelected.classList.remove('active');
   //    }

   //    document.getElementById('laptop').setAttribute('aria-label','laptop radio butoon selected');
   //    // window.scene.groupApplyState("screen_180");
   //    // window.scene.groupApplyState("GP_open");
   //    // window.scene.groupApplyState("dynamic_reset");
   //    // window.scene.groupApplyState("screenfill_180");

   //    setLaptop360FrontImg("./img/front180White.png");
   //    setLaptop360TopImg("./img/top180White.png");
   //    setLaptop360LefttImg("./img/180_white_left.png");
   //    setLaptop360RightImg("./img/180_white_right.png");
   //    resetBacklitCloseImg();

   //    window.localStorage.setItem("position","reset");
   //    window.localStorage.setItem("laptop","laptop180");
   //    // window.localStorage.removeItem('color');

   //    var radiobtn1 = document.getElementById('twoinoneRadio');
   //    radiobtn1.checked = false;
   //    var radioSelector1 = document.querySelector('#twoinoneRadio')
   //    var nextSibling1 = radioSelector1.nextElementSibling;
   //    var selectSVG1 = nextSibling1.lastChild;
   //    selectSVG1.style.transform = 'scale(0)'
   //    // nextSibling1.classList.remove('PrivateRadioButtonIcon-checked-16')
   //    var radiobtn2 = document.getElementById('laptopRadio');
   //    radiobtn2.checked = true;
   //    var radioSelector2 = document.querySelector('#laptopRadio')
   //    var nextSibling2 = radioSelector2.nextElementSibling;
   //    var selectSVG2 = nextSibling2.lastChild;
   //    selectSVG2.style.transform = 'scale(1)'
   //    // nextSibling2.classList.add('PrivateRadioButtonIcon-checked-16')
   //    document.getElementById("laptopRadio").tabIndex = 1;

   //    // window.localStorage.removeItem('hotspot');
   //    document.getElementById('whiteBtn').classList.add('select');
   //    document.getElementById('whiteBtn').classList.add('active');

   //    // var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //    //  alreadySelected.classList.remove('active');

   //    var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //    if (alreadySelected != null) {
   //       alreadySelected.classList.remove('active');
   //    }
   //    document.getElementById('whiteBtn').classList.add('active');
   //    var alreadySelected = document.querySelector('.MuiAccordionDetails-root.select');
   //    if (alreadySelected != null) {
   //       alreadySelected.classList.remove('select');
   //    }
   //    window.RT_RecordEvent("Product Type","Laptop",window.config.name);
   //    //add for tab issues
   //    document.getElementById("hotspot1").setAttribute("tabindex","-1");
   //    // document.getElementById("tentBtn").setAttribute("tabindex", "-1");
   //    // document.getElementById("theaterBtn").setAttribute("tabindex", "-1");
   //    // document.getElementById("tabletBtn").setAttribute("tabindex", "-1");

   //    document.getElementById("hotspot2").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot3").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot4").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot5").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot6").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot7").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot8").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot9").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot10").setAttribute("tabindex","-1");

   //    document.getElementById("hotspot11").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot12").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot13").setAttribute("tabindex","-1");

   //    document.getElementById("tentBtn").setAttribute("tabindex","-1");
   //    document.getElementById("theaterBtn").setAttribute("tabindex","-1");
   //    document.getElementById("tabletBtn").setAttribute("tabindex","-1");

   //    //  document.getElementById('laptop2in1').classList.remove('select');
   //    document.getElementById('laptop').classList.add('active');
   //    document.getElementById('laptop2in1').classList.remove('active');
   //    document.getElementById('laptop2in1').classList.remove('select');

   //    GotoPosInTimeNamedValue(window.config.default,function () {

   //       // window.scene.groupApplyState("Silver_180");
   //       // window.scene.groupApplyState("screenfill_180");
   //    });

   //    // document.querySelector('#blackBtn').classList.add('Btnsubmenus');
   //    document.querySelector('#blackBtn').classList.remove('Mui-disabled');
   //    // document.querySelector('#blackBtn').style.pointerEvents = 'auto';
   //    document.querySelector('#blackBtn').style.pointerEvents = "auto";
   //    // document.querySelector('#blackBtn').setAttribute = ("onclick");
   //    // document.querySelector('#menucolor').setAttribute = ("onBlackBtnClick");


   //    // document.querySelector('#tentBtn').classList.add('Mui-disabled');
   //    document.querySelector('#tentBtn').style.pointerEvents = 'none';
   //    // document.querySelector('#tentBtn').setAttribute("tabindex", "-1");

   //    // document.querySelector('#theaterBtn').classList.add('Mui-disabled');
   //    document.querySelector('#theaterBtn').style.pointerEvents = 'none';
   //    // document.querySelector('#theaterBtn').setAttribute("tabindex", "-1");

   //    // document.querySelector('#tabletBtn').classList.add('Mui-disabled');
   //    document.querySelector('#tabletBtn').style.pointerEvents = 'none';
   //    // document.querySelector('#tabletBtn').setAttribute("tabindex", "-1");
   //    document.getElementById("blackBtn").setAttribute("tabindex","1");

   //    // document.getElementById("tentBtn1").setAttribute("tabindex", "-1");
   //    // document.getElementById("theaterBtn1").setAttribute("tabindex", "-1");
   //    // document.getElementById("tabletBtn1").setAttribute("tabindex", "-1");

   //    if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
   //       var currentPosName = position.currentPos;
   //       if (position.reset == position[currentPosName]) { position.currentPos = 'reset'; return; }
   //       window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
   //       window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
   //       window.scene.clearRefine();
   //       position.currentPos = 'reset';
   //       window.scene.clearRefine();
   //    } else {
   //       var currentPosName = position.currentPos;
   //       if (position.reset == position[currentPosName]) { position.currentPos = 'reset'; return; }
   //       window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
   //       window.scene.clearRefine();
   //       position.currentPos = 'reset';
   //       window.scene.clearRefine();
   //    }


   // }

   // const [value,setValue] = useState('2 in 1');

   // const select2in1Click = (event) => {
   //    setlaptop360(true);
   //    setlaptop180(false);
   //    // console.log(laptop360);
   //    selectedButton = 'onResetMode';
   //    setValue(event.target.value);
   //    setDisplayed(false);
   //    setHidden(true);
   //    // setExpandedPanel(false);
   //    var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //    if (alreadySelected != null) {
   //       alreadySelected.classList.remove('active');
   //    }
   //    document.getElementById('laptop2in1').setAttribute('aria-label','2in1 radio butoon selected');
   //    var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
   //    if (alreadySelecte != null) {
   //       alreadySelecte.classList.remove('select');
   //    }

   //    // var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //    // if(alreadySelected != null){
   //    //   alreadySelected.classList.remove('active');
   //    // }
   //    document.getElementById('laptop2in1').classList.add('active');
   //    document.getElementById('laptop2in1').classList.add('select');
   //    document.getElementById('whiteBtn').classList.add('select');
   //    document.getElementById('whiteBtn').classList.add('active');
   //    document.getElementById('laptop').classList.remove('active');
   //    document.getElementById('laptop').classList.remove('select');
   //    document.getElementById("tentBtn").setAttribute("tabindex","1");
   //    document.getElementById("theaterBtn").setAttribute("tabindex","1");
   //    document.getElementById("tabletBtn").setAttribute("tabindex","1");

   //    // document.getElementById("blackBtn").setAttribute("tabindex", "-1");

   //    // window.localStorage.removeItem('hotspot');
   //    // window.scene.groupApplyState("screen_180");
   //    // window.scene.groupApplyState("GP_open");
   //    // window.localStorage.setItem("position","reset");
   //    // window.scene.groupApplyState("screenfill_360");
   //    // window.scene.groupApplyState("dynamic_reset");

   //    window.localStorage.setItem("laptop","laptop360");
   //    // window.localStorage.removeItem('hotspot');

   //    var radiobtn1 = document.getElementById('laptopRadio');
   //    radiobtn1.checked = false;
   //    var radioSelector1 = document.querySelector('#laptopRadio')
   //    var nextSibling1 = radioSelector1.nextElementSibling;
   //    var selectSVG1 = nextSibling1.lastChild;
   //    selectSVG1.style.transform = 'scale(0)'
   //    var radiobtn2 = document.getElementById('twoinoneRadio');
   //    radiobtn2.checked = true;
   //    var radioSelector2 = document.querySelector('#twoinoneRadio')
   //    var nextSibling2 = radioSelector2.nextElementSibling;
   //    var selectSVG2 = nextSibling2.lastChild;
   //    selectSVG2.style.transform = 'scale(1)'

   //    // window.localStorage.removeItem('color');
   //    document.getElementById("twoinoneRadio").tabIndex = 1;


   //    window.RT_RecordEvent("Product Type","2 in 1",window.config.name);
   //    //add for tab issues
   //    document.getElementById("hotspot1").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot2").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot3").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot4").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot5").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot6").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot7").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot8").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot9").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot10").setAttribute("tabindex","-1");

   //    document.getElementById("hotspot11").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot12").setAttribute("tabindex","-1");
   //    document.getElementById("hotspot13").setAttribute("tabindex","-1");


   //    setLaptop360FrontImg("./img/front360.png");
   //    setLaptop360TopImg("./img/top360.png");
   //    setLaptop360LefttImg("./img/360_left.png");
   //    setLaptop360RightImg("./img/360_right.png");

   //    resetBacklitCloseImg();

   //    GotoPosInTimeNamedValue(window.config.default,function () {
   //       // window.scene.groupApplyState("Silver");

   //    });
   //    // document.querySelector('#blackBtn').classList.add('Mui-disabled');
   //    document.querySelector('#blackBtn').style.pointerEvents = "auto";
   //    // document.querySelector('#blackBtns').classList.remove('Btnsubmenus');

   //    // document.querySelector('#blackBtn').removeAttribute = ("onclick");

   //    // document.querySelector('#menucolor').removeAttribute = ("onBlackBtnClick");


   //    document.querySelector('#tentBtn').classList.remove('Mui-disabled');
   //    document.querySelector('#tentBtn').style.pointerEvents = 'auto';
   //    // document.querySelector('#tentBtn').setAttribute("tabindex", "1");

   //    document.querySelector('#theaterBtn').classList.remove('Mui-disabled');
   //    document.querySelector('#theaterBtn').style.pointerEvents = 'auto';
   //    // document.querySelector('#theaterBtn').setAttribute("tabindex", "1");

   //    document.querySelector('#tabletBtn').classList.remove('Mui-disabled');
   //    document.querySelector('#tabletBtn').style.pointerEvents = 'auto';
   //    // document.querySelector('#tabletBtn').setAttribute("tabindex", "1");
   //    document.getElementById("blackBtn").setAttribute("tabindex","1");

   //    // document.getElementById("tentBtn1").setAttribute("tabindex", "1");
   //    // document.getElementById("theaterBtn1").setAttribute("tabindex", "1");
   //    // document.getElementById("tabletBtn1").setAttribute("tabindex", "1");

   //    // if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
   //    //    var currentPosName = position.currentPos;
   //    //    if (position.reset == position[currentPosName]) { position.currentPos = 'reset'; return; }
   //    //    window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
   //    //    window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
   //    //    window.scene.clearRefine();
   //    //    position.currentPos = 'reset';
   //    //    window.scene.clearRefine();
   //    // }
   //    // else {
   //       var currentPosName = position.currentPos;
   //       if (position.reset == position[currentPosName]) { position.currentPos = 'reset'; return; }
   //       window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
   //       window.scene.clearRefine();
   //       position.currentPos = 'reset';
   //       window.scene.clearRefine();
   //    // }

   // }

   //MenuProductView

   const onFrontClick = (isNextPrevious) => {
      reverseAll();
      // window.scene._nav._navMinDolly = 14.0; //110
      // window.scene._nav._navMaxDolly = 32.0; //110
      var slider = document.getElementById("sliderRange");
      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      // console.log(position.nintyDegree,position.currentPos)


      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }
      document.getElementById('frontBtn').classList.add('active');
      window.hotspot = " ";
      var currentPosName = position.currentPos;


      selectedButton = 'onFrontClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','Front view');

         document.getElementById('nextView').setAttribute('aria-label','Front view');
      }

      // window.localStorage.removeItem('hotspot');
      window.localStorage.setItem("position","reset");

      resetBacklitCloseImg();
      // window.scene.groupApplyState("Backlit_OFF");
      GotoPosInTimeNamedValue(window.config.front,function () {

         // window.scene.groupApplyState("Ref_ON");
         // window.scene.groupApplyState("GP_ON");
         window.hotspot = "front";
         // if (isNextPrevious != true) {
         //    window.document.getElementById("hotspot1demo").focus();
         // }
         // window.scene.animPlayInTime("Ref_Geo",1.0416666,0)
      
      })
      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","1");
         document.getElementById("hotspot2").setAttribute("tabindex","1");
         document.getElementById("hotspot3").setAttribute("tabindex","1");
         document.getElementById("hotspot4").setAttribute("tabindex","-1");
         document.getElementById("hotspot5").setAttribute("tabindex","-1");
         document.getElementById("hotspot6").setAttribute("tabindex","-1");
         document.getElementById("hotspot7").setAttribute("tabindex","-1");
         document.getElementById("hotspot8").setAttribute("tabindex","-1");
         document.getElementById("hotspot9").setAttribute("tabindex","-1");
         document.getElementById("hotspot10").setAttribute("tabindex","-1");
         document.getElementById("hotspot11").setAttribute("tabindex","-1");
         document.getElementById("hotspot12").setAttribute("tabindex","-1");
         document.getElementById("hotspot13").setAttribute("tabindex","-1");
         document.getElementById("hotspot14").setAttribute("tabindex","-1");
         document.getElementById("hotspot15").setAttribute("tabindex","-1");
         document.getElementById("hotspot16").setAttribute("tabindex","-1");
         document.getElementById("hotspot17").setAttribute("tabindex","-1");
         document.getElementById("hotspot18").setAttribute("tabindex","-1");
         document.getElementById("hotspot19").setAttribute("tabindex","-1");
         document.getElementById("hotspot20").setAttribute("tabindex","-1");
         document.getElementById("hotspot21").setAttribute("tabindex","-1");
         document.getElementById("hotspot22").setAttribute("tabindex","-1");
         document.getElementById("hotspot23").setAttribute("tabindex","-1");
         document.getElementById("hotspot24").setAttribute("tabindex","-1");
         document.getElementById("hotspot25").setAttribute("tabindex","-1");
         document.getElementById("hotspot26").setAttribute("tabindex","-1");
         document.getElementById("hotspot27").setAttribute("tabindex","-1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");

      }
      if (position.nintyDegree == position[currentPosName]) { position.currentPos = 'nintyDegree'; return; }
      // if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
      //    console.log("Theater")
      //    window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      //    window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      // }
      else {
         // console.log("animation time",animTime)
         window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.animPlayAllChildrenInTime("Ref_Geo",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      }

      window.RT_RecordEvent("Product Type","nintyDegree",window.config.name);
      window.scene.clearRefine();
      position.currentPos = 'nintyDegree';

   }

   const onRightClick = (isNextPrevious) => {
      reverseAll();
      // window.scene._nav._navMinDolly = 13.0; //110
      // window.scene._nav._navMaxDolly = 24.0; //110
      // window.scene._nav._panMax = [10,14];    //[left, bottom];
      // window.scene._nav._panMin = [-10,-6];  //[right, top]
      // console.log("right")
      // console.log("onRightClick")
      var slider = document.getElementById("sliderRange");
      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }

      selectedButton = 'onRightClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','right view');

         document.getElementById('nextView').setAttribute('aria-label','right view');
      }
      // window.hotspot = " "
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('rightBtn').classList.add('active');

      window.hotspot = " ";;
      window.localStorage.setItem("position","reset");
      // window.localStorage.removeItem('hotspot');
      resetBacklitCloseImg();
      // window.scene.groupApplyState("Backlit_OFF");
      GotoPosInTimeNamedValue(window.config.right,function () {

         // window.scene.groupApplyState("GP_ON");
         // window.scene.groupApplyState("Ref_ON");
         window.hotspot = "right"
         // window.scene.animPlayInTime("Ref_Geo",1.0416666,0)
         // window.scene.clearRefine();
         // if (isNextPrevious != true) {
         //    window.document.getElementById("hotspot1demo").focus();
         // }
      });
      // window.document.getElementById("hotspot11").focus();
      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","-1");
         document.getElementById("hotspot2").setAttribute("tabindex","-1");
         document.getElementById("hotspot3").setAttribute("tabindex","-1");
         document.getElementById("hotspot4").setAttribute("tabindex","-1");
         document.getElementById("hotspot5").setAttribute("tabindex","-1");
         document.getElementById("hotspot6").setAttribute("tabindex","-1");
         document.getElementById("hotspot7").setAttribute("tabindex","1");
         document.getElementById("hotspot8").setAttribute("tabindex","1");
         document.getElementById("hotspot9").setAttribute("tabindex","1");
         document.getElementById("hotspot10").setAttribute("tabindex","1");

         document.getElementById("hotspot11").setAttribute("tabindex","1");
         document.getElementById("hotspot12").setAttribute("tabindex","1");
         document.getElementById("hotspot13").setAttribute("tabindex","-1");
         document.getElementById("hotspot14").setAttribute("tabindex","-1");
         document.getElementById("hotspot15").setAttribute("tabindex","-1");
         document.getElementById("hotspot16").setAttribute("tabindex","-1");
         document.getElementById("hotspot17").setAttribute("tabindex","-1");
         document.getElementById("hotspot18").setAttribute("tabindex","-1");
         document.getElementById("hotspot19").setAttribute("tabindex","-1");
         document.getElementById("hotspot20").setAttribute("tabindex","-1");
         document.getElementById("hotspot21").setAttribute("tabindex","-1");
         document.getElementById("hotspot22").setAttribute("tabindex","-1");
         document.getElementById("hotspot23").setAttribute("tabindex","-1");
         document.getElementById("hotspot24").setAttribute("tabindex","-1");
         document.getElementById("hotspot25").setAttribute("tabindex","-1");
         document.getElementById("hotspot26").setAttribute("tabindex","-1");
         document.getElementById("hotspot27").setAttribute("tabindex","-1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");
         document.getElementById("hotspot9").setAttribute("tabindex","-1");
         document.getElementById("hotspot10").setAttribute("tabindex","-1");

         document.getElementById("hotspot11").setAttribute("tabindex","-1");
         document.getElementById("hotspot12").setAttribute("tabindex","-1");
         document.getElementById("hotspot13").setAttribute("tabindex","-1");
      }
      var currentPosName = position.currentPos;
      if (position.nintyDegree == position[currentPosName]) { position.currentPos = 'nintyDegree'; return; }
      // if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
      //    console.log("Theater")
      //    window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      //    window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      // }
      // else {
      // console.log("else")
      // console.log(animTime)
      window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      window.scene.animPlayAllChildrenInTime("Ref_Geo",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      // }
      position.currentPos = 'nintyDegree';

      window.RT_RecordEvent("Product Type","Right",window.config.name);
      window.scene.clearRefine();
   }

   const onLeftClick = (isNextPrevious) => {
      reverseAll();
      // window.scene._nav._navMinDolly = 13.0; //110
      // window.scene._nav._navMaxDolly = 24.0; //110
      // window.scene._nav._panMax = [10,14];    //[left, bottom];
      // window.scene._nav._panMin = [-10,-6];  //[right, top]
      //Update ZoomBar
      // console.log("onLeftClick")
      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }

      selectedButton = 'onLeftClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','left view');

         document.getElementById('nextView').setAttribute('aria-label','left view');
      }
      window.hotspot = " ";;
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('leftBtn').classList.add('active');
      window.localStorage.setItem("position","reset");


      // window.hotspot = " ";;

      // window.hotspot = " ";;

      resetBacklitCloseImg();

      // window.scene.groupApplyState("Backlit_OFF");

      GotoPosInTimeNamedValue(window.config.left,function () {

         // window.scene.groupApplyState("GP_ON");
         // window.scene.groupApplyState("Ref_ON");
         window.hotspot = "left"
         // window.scene.animPlayInTime("Ref_Geo",1.0416666,0)
         // if (isNextPrevious != true) {
         //    window.document.getElementById("hotspot1demo").focus();
         // }

      });
      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","-1");
         document.getElementById("hotspot2").setAttribute("tabindex","-1");
         document.getElementById("hotspot3").setAttribute("tabindex","-1");
         document.getElementById("hotspot4").setAttribute("tabindex","-1");
         document.getElementById("hotspot5").setAttribute("tabindex","-1");
         document.getElementById("hotspot6").setAttribute("tabindex","-1");
         document.getElementById("hotspot7").setAttribute("tabindex","-1");
         document.getElementById("hotspot8").setAttribute("tabindex","-1");
         document.getElementById("hotspot9").setAttribute("tabindex","-1");
         document.getElementById("hotspot10").setAttribute("tabindex","-1");

         document.getElementById("hotspot11").setAttribute("tabindex","-1");
         document.getElementById("hotspot12").setAttribute("tabindex","-1");
         document.getElementById("hotspot13").setAttribute("tabindex","1");
         document.getElementById("hotspot14").setAttribute("tabindex","1");
         document.getElementById("hotspot15").setAttribute("tabindex","1");
         document.getElementById("hotspot16").setAttribute("tabindex","1");
         document.getElementById("hotspot17").setAttribute("tabindex","1");
         document.getElementById("hotspot18").setAttribute("tabindex","-1");
         document.getElementById("hotspot19").setAttribute("tabindex","-1");
         document.getElementById("hotspot20").setAttribute("tabindex","-1");
         document.getElementById("hotspot21").setAttribute("tabindex","-1");
         document.getElementById("hotspot22").setAttribute("tabindex","-1");
         document.getElementById("hotspot23").setAttribute("tabindex","-1");
         document.getElementById("hotspot24").setAttribute("tabindex","-1");
         document.getElementById("hotspot25").setAttribute("tabindex","-1");
         document.getElementById("hotspot26").setAttribute("tabindex","-1");
         document.getElementById("hotspot27").setAttribute("tabindex","-1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");

      }
      var currentPosName = position.currentPos;
      if (position.nintyDegree == position[currentPosName]) { position.currentPos = 'nintyDegree'; return; }
      // if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
      //    console.log("Theater")
      //    window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      //    window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      // }
      // else {
      // console.log("else")
      window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      window.scene.animPlayAllChildrenInTime("Ref_Geo",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      // }
      position.currentPos = 'nintyDegree';

      window.RT_RecordEvent("Product Type","left",window.config.name);
      window.scene.clearRefine();
   }

   const onTopClick = (isNextPrevious) => {
      reverseAll();
      //Update ZoomBar
      window.scene._nav._panMax = [10,2];    //[left, bottom];
      // window.scene._nav._panMin = [-10,-6];  //[right, top]

      // console.log(position.top,position.currentPos)


      selectedButton = 'onTopClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','Top view');

         document.getElementById('nextView').setAttribute('aria-label','Top view');
      }
      // if (laptop180) {
      //    window.scene.groupApplyState("screenfill_180");
      // } else {
      //    window.scene.groupApplyState("screenfill_360");
      // }

      window.hotspot = " ";;

      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }


      document.getElementById('topBtn').classList.add('active');
      // window.hotspot = " ";;
      // window.scene.groupApplyState("screen_180");
      // if (laptop180) {
      //    window.scene.groupApplyState("screenfill_180");
      // } else {
      //    window.scene.groupApplyState("screenfill_360");
      // }
      window.localStorage.setItem("position","reset");
      resetBacklitCloseImg();
      // window.scene.groupApplyState("Backlit_OFF");
      // window.scene.groupApplyState("GP_OFF");
      // window.scene.groupApplyState("Global_Ref_off");
      GotoPosInTimeNamedValue(window.config.top,function () {
         // var center = [0, 11.717319, 0];
         // window.scene._nav.SetRotationCenter(center);
         // window.scene.groupApplyState("GP_ON");
         // window.scene.groupApplyState("Ref_ON");
         window.hotspot = "top"
         // window.scene.animPlayInTime("Ref_Geo",1.0416666,0)
 
         // if (isNextPrevious != true) {
         //    window.document.getElementById("hotspot1demo").focus();
         // }
         var center = [0,8.926640999999999,0];
         window.scene._nav.SetRotationCenter(center);
         var slider = document.getElementById("sliderRange");
         if (slider != null) {
            document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
            setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
         }


      });

      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","-1");
         document.getElementById("hotspot2").setAttribute("tabindex","-1");
         document.getElementById("hotspot3").setAttribute("tabindex","-1");
         document.getElementById("hotspot4").setAttribute("tabindex","1");
         document.getElementById("hotspot5").setAttribute("tabindex","1");
         document.getElementById("hotspot6").setAttribute("tabindex","1");
         document.getElementById("hotspot7").setAttribute("tabindex","-1");
         document.getElementById("hotspot8").setAttribute("tabindex","-1");
         document.getElementById("hotspot9").setAttribute("tabindex","-1");
         document.getElementById("hotspot10").setAttribute("tabindex","-1");

         document.getElementById("hotspot11").setAttribute("tabindex","-1");
         document.getElementById("hotspot12").setAttribute("tabindex","-1");
         document.getElementById("hotspot13").setAttribute("tabindex","-1");
         document.getElementById("hotspot14").setAttribute("tabindex","-1");
         document.getElementById("hotspot15").setAttribute("tabindex","-1");
         document.getElementById("hotspot16").setAttribute("tabindex","-1");
         document.getElementById("hotspot17").setAttribute("tabindex","-1");
         document.getElementById("hotspot18").setAttribute("tabindex","-1");
         document.getElementById("hotspot19").setAttribute("tabindex","-1");
         document.getElementById("hotspot20").setAttribute("tabindex","-1");
         document.getElementById("hotspot21").setAttribute("tabindex","-1");
         document.getElementById("hotspot22").setAttribute("tabindex","-1");
         document.getElementById("hotspot23").setAttribute("tabindex","-1");
         document.getElementById("hotspot24").setAttribute("tabindex","-1");
         document.getElementById("hotspot25").setAttribute("tabindex","-1");
         document.getElementById("hotspot26").setAttribute("tabindex","-1");
         document.getElementById("hotspot27").setAttribute("tabindex","-1");
         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");

      }
      var currentPosName = position.currentPos;
      if (position.top == position[currentPosName]) { position.currentPos = 'top'; return; }
      // if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
      //    console.log("Theater")
      //    window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      //    window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      // }
      else {
         // console.log("else")
         window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.animPlayAllChildrenInTime("Ref_Geo",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],0);

      }
      position.currentPos = 'top';

      window.RT_RecordEvent("Product Type","Top",window.config.name);
      window.scene.clearRefine();
   }

   const onBackClick = (isNextPrevious) => {
      reverseAll();
      // window.scene._nav._navMinDolly = 14.0; //110
      // window.scene._nav._navMaxDolly = 28.0; //110
      //Update ZoomBar
      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      setOpenClose("./img/Lid_open.svg");
      // console.log(position.nintyDegree,position.currentPos)
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }
      document.getElementById('backBtn').classList.add('active');
      // window.hotspot = " ";;
      var currentPosName = position.currentPos;

      selectedButton = 'onBackClick';
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','Front view');

         document.getElementById('nextView').setAttribute('aria-label','Front view');
      }
      window.hotspot = " ";;
      window.localStorage.setItem("position","reset");
      window.scene.groupApplyState("SPOT_ON");
      // window.scene.animPlayInTime("SCREEN",1.083,0);
      // window.scene.animPlayInTime("CA_Precision_3581",1.1250000,0);
      GotoPosInTimeNamedValue(window.config.back,function () {
         // window.scene.groupApplyState("Ref_ON");
         // window.scene.groupApplyState("GP_ON");

      
         window.scene.clearRefine();
         
         window.hotspot = "back"
         // if (isNextPrevious != true) {
         //    window.document.getElementById("hotspot1demo").focus();
         // }
      })
      if (!(window.isipad || window.mob)) {
         document.getElementById("hotspot1").setAttribute("tabindex","-1");
         document.getElementById("hotspot2").setAttribute("tabindex","-1");
         document.getElementById("hotspot3").setAttribute("tabindex","-1");
         document.getElementById("hotspot4").setAttribute("tabindex","-1");
         document.getElementById("hotspot5").setAttribute("tabindex","-1");
         document.getElementById("hotspot6").setAttribute("tabindex","-1");
         document.getElementById("hotspot7").setAttribute("tabindex","-1");
         document.getElementById("hotspot8").setAttribute("tabindex","-1");
         document.getElementById("hotspot9").setAttribute("tabindex","-1");
         document.getElementById("hotspot10").setAttribute("tabindex","-1");

         document.getElementById("hotspot11").setAttribute("tabindex","-1");
         document.getElementById("hotspot12").setAttribute("tabindex","-1");
         document.getElementById("hotspot13").setAttribute("tabindex","-1");
         document.getElementById("hotspot14").setAttribute("tabindex","-1");
         document.getElementById("hotspot15").setAttribute("tabindex","-1");
         document.getElementById("hotspot16").setAttribute("tabindex","-1");
         document.getElementById("hotspot17").setAttribute("tabindex","-1");
         document.getElementById("hotspot27").setAttribute("tabindex","1");
         document.getElementById("hotspot18").setAttribute("tabindex","1");
         document.getElementById("hotspot19").setAttribute("tabindex","-1");
         document.getElementById("hotspot20").setAttribute("tabindex","1");
         document.getElementById("hotspot21").setAttribute("tabindex","-1");
         document.getElementById("hotspot22").setAttribute("tabindex","-1");
         document.getElementById("hotspot23").setAttribute("tabindex","-1");
         document.getElementById("hotspot24").setAttribute("tabindex","-1");
         document.getElementById("hotspot25").setAttribute("tabindex","-1");
         document.getElementById("hotspot26").setAttribute("tabindex","1");

         document.getElementById("rLeft").setAttribute("tabindex","0");
         document.getElementById("rRight").setAttribute("tabindex","0");
         document.getElementById("zoomOut").setAttribute("tabindex","0");
         document.getElementById("sliderRange").setAttribute("tabindex","0");
         document.getElementById("zoomIn").setAttribute("tabindex","0");
         document.getElementById("previousView").setAttribute("tabindex","0");
         document.getElementById("resetView").setAttribute("tabindex","0");
         document.getElementById("nextView").setAttribute("tabindex","0");

      }
      if (position.back == position[currentPosName]) { position.currentPos = 'back'; return; }
      // window.scene.animPlayAllChildrenInTime("SCREEN",position.nintyDegree,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.back,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      window.scene.animPlayAllChildrenInTime("Ref_Geo",position.back,animTime,undefined,undefined,undefined,true,position[currentPosName],0);

      window.scene.clearRefine();
      position.currentPos = 'back';
      window.RT_RecordEvent("Product Type","Back",window.config.name);

   }

   // const onExplodeClick = (isNextPrevious) => {

   //    // reverseAll();
   //    // window.scene._nav._navMinDolly = 17.0; //110
   //    window.scene._nav._navMaxDolly = 35.0; //110
   //    // var center = [0, 0, 0];
   //    // window.scene._nav.SetRotationCenter(center);

   //    // console.log(position.exploaded,position.currentPos)
   //    setOpenClose("./img/Lid_open.svg");
   //    // window.scene.groupApplyState("Open_Laptop");



   //    selectedButton = 'onExplodeClick';
   //    if (!(mob || isipad)) {
   //       document.getElementById('previousView').setAttribute('aria-label','Top view');

   //       document.getElementById('nextView').setAttribute('aria-label','Top view');
   //    }


   //    var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //    if (alreadySelected != null) {
   //       alreadySelected.classList.remove('active');
   //    }
   //    resetBacklitCloseImg();
   //    // window.scene.groupApplyState("Internals_ON");
   //    window.scene.groupApplyState("Ref_OFF");
   //    // window.scene.groupApplyState("GP_OFF");
   //    window.scene.groupApplyState("Backlight_OFF");

   //    window.localStorage.removeItem('hotspot');

   //    document.getElementById('explodeBtn').classList.add('active');
   //    window.localStorage.setItem("position","reset");
   //    GotoPosInTimeNamedValue(window.config.exploded,function () {
   //       // window.scene.groupApplyState("internal_on");
   //       window.scene.animPlayInTime("D_COVER",3.1250000,1000);

   //       window.scene.animPlayInTime("SCREEN",3.1250000,1000,function () {
   //          window.localStorage.setItem('hotspot','explode')
   //       });
   //       window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.exploaded,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
   //       var slider = document.getElementById("sliderRange");

   //       if (slider != null) {
   //          document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
   //          setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
   //       }
   //    });
   //    if (!(window.isipad || window.mob)) {
   //       document.getElementById("hotspot1").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot2").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot3").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot4").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot5").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot6").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot7").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot8").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot9").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot10").setAttribute("tabindex","-1");

   //       document.getElementById("hotspot11").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot12").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot13").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot14").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot15").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot16").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot17").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot18").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot19").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot20").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot21").setAttribute("tabindex","1");
   //       document.getElementById("hotspot22").setAttribute("tabindex","1");
   //       document.getElementById("hotspot23").setAttribute("tabindex","1");
   //       document.getElementById("hotspot24").setAttribute("tabindex","1");
   //       document.getElementById("hotspot25").setAttribute("tabindex","1");
   //       document.getElementById("hotspot26").setAttribute("tabindex","-1");
   //       document.getElementById("hotspot27").setAttribute("tabindex","-1");
   //       document.getElementById("rLeft").setAttribute("tabindex","0");
   //       document.getElementById("rRight").setAttribute("tabindex","0");
   //       document.getElementById("zoomOut").setAttribute("tabindex","0");
   //       document.getElementById("sliderRange").setAttribute("tabindex","0");
   //       document.getElementById("zoomIn").setAttribute("tabindex","0");
   //       document.getElementById("previousView").setAttribute("tabindex","0");
   //       document.getElementById("resetView").setAttribute("tabindex","0");
   //       document.getElementById("nextView").setAttribute("tabindex","0");

   //    }
   //    var currentPosName = position.currentPos;
   //    if (position.explode == position[currentPosName]) { position.currentPos = 'explode'; return; }
   //    // window.scene.groupApplyState("Internals_On");
   //    position.currentPos = 'explode';
   //    window.RT_RecordEvent("Product Type","Explode",window.config.name);
   //    window.scene.clearRefine();
   // }

   //MenuFeatureView

   const [openCloseOnOff,setOpenCloseOnOff] = useState(false);
   const [backlit,setBacklite] = useState("./img/Backlite_Off.svg");
   const [opneClose,setOpenClose] = useState("./img/Lid_open.svg");
   const [backliteOnOff,setBackliteOnOff] = useState(false);
   const [FPRIcon,setFPRIcon] = useState("./img/without-FPR.png");
   const [FPROnOff,setFPROnOff] = useState(false);


   const openCloseClick = () => {
      reverseAll();

      // console.log(position.close,position.currentPos)
      //Update ZoomBar
      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      selectedButton = 'openCloseClick';


      var fromPos = window.localStorage.getItem('hotspot')
      window.hotspot = " ";
      window.localStorage.setItem('closeMode','on');
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('openCloseBtn').classList.add('active');
      // window.scene.groupApplyState("screen_180");
      if (laptop180) {
         // window.scene.groupApplyState("screenfill_180");
      } else {
         // window.scene.groupApplyState("screenfill_360");
      }
      setBackliteOnOff(false);
      // window.scene.groupApplyState("Backlit_OFF");
      setBacklite("./img/Backlite_Off.svg");



      if (openCloseOnOff) {
         // console.log("open")
         document.getElementById('openCloseBtn').setAttribute('aria-label','');
         document.getElementById('openCloseLid').innerHTML = 'Open Lid';
         if (!(mob || isipad)) {
            document.getElementById('previousView').setAttribute('aria-label','Open Lid');

            document.getElementById('nextView').setAttribute('aria-label','Open Lid');


         }
         setOpenCloseOnOff(false);
         setOpenClose("./img/Lid_open.svg");
         // window.scene.groupApplyState("Open_Laptop");
         // window.scene.groupApplyState("With_SC_CARD");
         GotoPosInTimeNamedValue(window.config.default,function () {
            // window.scene.groupApplyState("Ref_ON");
            // window.scene.groupApplyState("GP_ON");
            // window.scene.animPlayInTime("Ref_Geo",1.0416666,0)
 
            // var center = [0,8.926640999999999,0];
            // window.scene._nav.SetRotationCenter(center);

         });

         var currentPosName = position.currentPos;
         if (position.reset == position[currentPosName]) { position.currentPos = 'reset'; return; }
         // window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         // window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.animPlayAllChildrenInTime("Ref_Geo",position.reset,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         

         window.RT_RecordEvent("Features","Open Lid",window.config.name);
    
         position.currentPos = 'reset';
      } else {
         // console.log("close")
         document.getElementById('openCloseBtn').setAttribute('aria-label','');
         document.getElementById('openCloseLid').innerHTML = 'Close Lid';
         if (!(mob || isipad)) {
            document.getElementById('previousView').setAttribute('aria-label','Close Lid');

            document.getElementById('nextView').setAttribute('aria-label','Close Lid');
         }
         setOpenCloseOnOff(true);
         setBackliteOnOff(false);
         setOpenClose("./img/Lid_close.svg");


         GotoPosInTimeNamedValue(window.config.close,function () {

            // window.scene.groupApplyState("Ref_ON");
            // window.scene.groupApplyState("GP_ON");
            // window.scene.animPlayInTime("Ref_Geo",1.0416666,0)
            window.scene.clearRefine();
            // window.scene.groupApplyState("Close_Laptop");

            // var center = [0,8.926640999999999,0];
            // window.scene._nav.SetRotationCenter(center);


            // window.scene._nav._revertPan = true;
            // window.scene._nav._revertPanOriginal = [-0.14362300000000006,7.360824];



         });

         var currentPosName = position.currentPos;
         if (position.close == position[currentPosName]) { position.currentPos = 'close'; return; }
         // if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
         //    console.log("Theater")
         //    window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.close,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         //    window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.close,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
         // }
         else {
            // console.log("else")
            window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.close,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
            window.scene.animPlayAllChildrenInTime("Ref_Geo",position.close,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
            

         }

         window.RT_RecordEvent("Features","Close Lid",window.config.name);
         position.currentPos = 'close';
         window.scene.clearRefine();
      }


   }
   let backliteVar = document.getElementById('backlitBtn');

   const backliteClick = () => {
      reverseAll();
      window.scene._nav._panMax = [10,2];    //[left, bottom]; //[left, bottom];
      // window.scene._nav._panMin = [-16,-8];  //[right, top]

      //Update ZoomBar
      // console.log("backliteClick");


      selectedButton = 'backliteClick';
      // window.localStorage.removeItem('hotspot');
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('backlitBtn').classList.add('active');

      window.hotspot = " ";;
      // window.scene.groupApplyState("screen_180");/
      // window.scene.groupApplyState("dynamic_reset");

      if (laptop180) {
         window.scene.groupApplyState("screenfill_180");
      } else {
         window.scene.groupApplyState("screenfill_360");
      }
      // window.scene.groupApplyState("GP_open");
      // window.scene.groupApplyState("dynamic_reset");

      resetBacklitCloseImg();

      GotoPosInTimeNamedValue(window.config.top,function () {


         window.localStorage.setItem('hotspot','backlit');
         var slider = document.getElementById("sliderRange");

         if (slider != null) {
            document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
            setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
         }

        
      })

      //add for tab issues
      document.getElementById("hotspot1").setAttribute("tabindex","-1");
      document.getElementById("hotspot2").setAttribute("tabindex","-1");
      document.getElementById("hotspot3").setAttribute("tabindex","-1");
      document.getElementById("hotspot4").setAttribute("tabindex","-1");
      document.getElementById("hotspot5").setAttribute("tabindex","-1");
      document.getElementById("hotspot6").setAttribute("tabindex","-1");
      document.getElementById("hotspot7").setAttribute("tabindex","-1");
      document.getElementById("hotspot8").setAttribute("tabindex","-1");
      document.getElementById("hotspot9").setAttribute("tabindex","-1");
      document.getElementById("hotspot10").setAttribute("tabindex","-1");

      document.getElementById("hotspot11").setAttribute("tabindex","-1");
      document.getElementById("hotspot12").setAttribute("tabindex","-1");
      document.getElementById("hotspot13").setAttribute("tabindex","-1");

      if (backliteOnOff) {

         // console.log("off");
         setBackliteOnOff(false);
         document.getElementById('backlitBtn').setAttribute('aria-label','');
         document.getElementById('backlitOnnOff').innerHTML = 'Backlit off';
         if (!(mob || isipad)) {
            document.getElementById('previousView').setAttribute('aria-label','Backlit off');
            document.getElementById('nextView').setAttribute('aria-label','Backlit off');
         }

         GotoPosInTimeNamedValue(window.config.top,function () {
            var center = [0,8.926640999999999,0];
            window.scene._nav.SetRotationCenter(center);

         })
         window.scene.groupApplyState("Backlight_OFF");
    
         window.RT_RecordEvent("Features","Backlite Off",window.config.name);

      }
      else {
         document.getElementById('backlitBtn').setAttribute('aria-label','');
         document.getElementById('backlitOnnOff').innerHTML = 'Backlit on';
         if (!(mob || isipad)) {
            document.getElementById('previousView').setAttribute('aria-label','Backlit on');
            document.getElementById('nextView').setAttribute('aria-label','Backlit on');
         }
         setBackliteOnOff(true);
         // console.log("on");
         setBacklite("./img/Backlite_On.svg");
         GotoPosInTimeNamedValue(window.config.top,function () {
            var center = [0,8.926640999999999,0];
            window.scene._nav.SetRotationCenter(center);

         })
         window.scene.groupApplyState("Backlight_ON");
         window.RT_RecordEvent("Features","Backlite On",window.config.name);
  

      }
      var currentPosName = position.currentPos;
      if (position.top == position[currentPosName]) { position.currentPos = 'top'; return; }

      else {
         // console.log("else")
         window.scene.animPlayAllChildrenInTime("SCREEN",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      }
      window.scene.clearRefine();
      position.currentPos = 'top';
   }

   const FPRClick = () => {
      reverseAll();
      window.scene._nav._panMax = [10,2];    //[left, bottom];   //[left, bottom];
      // window.scene._nav._panMin = [-16,-8];  //[right, top]
      //Update ZoomBar

      selectedButton = 'FPRClick';


      window.hotspot = " ";;
      var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      if (alreadySelected != null) {
         alreadySelected.classList.remove('active');
      }

      document.getElementById('FPRBtn').classList.add('active');

      window.localStorage.setItem("position","reset");

      window.scene.groupApplyState("dynamic_reset");
      window.scene.groupApplyState("Backlit_OFF");

      resetBacklitCloseImg();
      // window.scene.groupApplyState("GP_0_and_50_Frame:0_frame");
      // window.scene.groupApplyState("Backlit_ON_and_OFF:Backlit_OFF");
      GotoPosInTimeNamedValue(window.config.top,function () {
         var center = [0,8.926640999999999,0];
         window.scene._nav.SetRotationCenter(center);
         var slider = document.getElementById("sliderRange");

         if (slider != null) {
            document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
            setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
         }

      })

      //add for tab issues
      document.getElementById("hotspot1").setAttribute("tabindex","-1");
      document.getElementById("hotspot2").setAttribute("tabindex","-1");
      document.getElementById("hotspot3").setAttribute("tabindex","-1");
      document.getElementById("hotspot4").setAttribute("tabindex","-1");
      document.getElementById("hotspot5").setAttribute("tabindex","-1");
      document.getElementById("hotspot6").setAttribute("tabindex","-1");
      document.getElementById("hotspot7").setAttribute("tabindex","-1");
      document.getElementById("hotspot8").setAttribute("tabindex","-1");
      document.getElementById("hotspot9").setAttribute("tabindex","-1");
      document.getElementById("hotspot10").setAttribute("tabindex","-1");

      if (FPROnOff) {

         // console.log("off");
         setFPROnOff(false);
         setFPRIcon("./img/without-FPR.png");

         // document.getElementById('FPRBtn').setAttribute('aria-label','');
         // document.getElementById('backlitOnnOff').innerHTML = 'FPR On';
         if (!(mob || isipad)) {
            document.getElementById('previousView').setAttribute('aria-label','FPR off');
            document.getElementById('nextView').setAttribute('aria-label','FPR off');
         }
         window.scene.groupApplyState("FPR_OFF");
         GotoPosInTimeNamedValue(window.config.top,function () {
            var center = [0,8.926640999999999,0];
            window.scene._nav.SetRotationCenter(center);
            // window.localStorage.setItem('hotspot','FPROff');

            var slider = document.getElementById("sliderRange");

            if (slider != null) {
               document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
               setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
            }
         })


      } else {
         // document.getElementById('backlitBtn').setAttribute('aria-label','');
         // document.getElementById('backlitOnnOff').innerHTML = 'Backlit on';
         if (!(mob || isipad)) {
            document.getElementById('previousView').setAttribute('aria-label','FPR on');
            document.getElementById('nextView').setAttribute('aria-label','FPR on');
         }
         setFPROnOff(true);
         // console.log("on");
         setFPRIcon("./img/with-FPR.svg");
         window.scene.groupApplyState("FPR_ON");
         GotoPosInTimeNamedValue(window.config.top,function () {
            var center = [0,8.926640999999999,0];
            window.scene._nav.SetRotationCenter(center);

            // window.localStorage.setItem('hotspot','FPROn');
            var slider = document.getElementById("sliderRange");

            if (slider != null) {
               document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
               setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
            }
         })


       

      }
      var currentPosName = position.currentPos;
      if (position.top == position[currentPosName]) { position.currentPos = 'top'; return; }
      // if (position.currentPos == 'theatre' || position.currentPos == 'tablet') {
      //    console.log("Theater")
      //    window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version1",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      //    window.scene.animPlayAllChildrenInTime("Latitude_7410_Chromebook_Enterprise_360_Version2",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
      // }
      else {
         // console.log("else")
         window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
         window.scene.animPlayAllChildrenInTime("Ref_Geo",position.top,animTime,undefined,undefined,undefined,true,position[currentPosName],0);
      }
      window.scene.clearRefine();
      position.currentPos = 'top';
   }

   //menucolor

   // const color1Click = () => {

   //    // window.scene.groupApplyState("Millenio_5G_OFF");


   //    // window.storeData.currentState = "sky";
   //    //   var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
   //    // alreadySelecte.classList.remove('select');
   //    console.log("click1");
   //    var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
   //    if (alreadySelecte != null) {
   //       alreadySelecte.classList.remove('select');
   //    }
   //    var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //    if (alreadySelected != null) {
   //       alreadySelected.classList.remove('active');
   //    }
   //    document.getElementById('blackBtn').classList.add('select');
   //    document.getElementById('blackBtn').classList.add('active');
   //    document.getElementById('whiteBtn').classList.remove('active');

   //    window.localStorage.setItem("position","reset");

   //    setOpenCloseOnOff(false);
   //    // setOpenClose("./img/Folio_W.png");
   //    setBackliteOnOff(false);
   //    // setBacklite("./img/stylus_W.png");
   //    // setLaptop360FrontImg("./img/front180White.png");
   //    // setLaptop360TopImg("./img/top180White.png");
   //    // setLaptop360LefttImg("./img/180_white_left.png");
   //    // setLaptop360RightImg("./img/180_white_right.png");
   //    // setLaptop360BackImg("./img/180_white_back.png");
   //    // setLaptop360BottomImg("./img/180_white_Bottom.png");
   //    // window.scene.groupApplyState("screenfill_180");
   //    // window.localStorage.setItem("color","laptopSilver");
   //    setPort4Click(false);
   //    // if (window.localStorage.getItem('laptop') == 'laptop360') {
   //    //    console.log('a')
   //    //    window.scene.groupApplyState("Silver");  

   //    // }
   //    // else if (window.localStorage.getItem('laptop') == 'laptop180') {
   //    //    console.log('b')
   //    //    window.scene.groupApplyState("Silver_180");
   //    //    window.scene.groupApplyState("screenfill_180");

   //    // }

   //    if (window.localStorage.getItem('features') == "folio") {
   //       // window.scene.groupApplyState("Folio_Sky");
   //       // window.scene.groupApplyState("Folio_Sky_shadow");

   //       // setOpenClose("./img/Folio_W.png");
   //       // console.log("sky se folio ");
   //    }
   //    else if (window.localStorage.getItem('features') == "stylus") {
   //       // window.scene.groupApplyState("Stylus_Sky");
   //       // setOpenClose("./img/Folio_B.png");
   //       // console.log("sky se Stylus_Sky ");
   //    }
   //    else {
   //       // window.scene.groupApplyState("Millenio_WIFI_ON");
   //    }

   //    if (selectedButton == 'xpsFolioClick' || selectedButton == 'xpsStylusClick') {
   //       // window.scene.groupApplyState("Tab_Reflection_OFF");
   //    }
   //    else {
   //       // console.log('reflection on');
   //       // window.scene.groupApplyState("Tab_Reflection_ON");
   //    }



   //    // window.localStorage.setItem("silver",true);
   //    window.RT_RecordEvent("Color","Aluminium",window.config.name);
   //    window.scene.clearRefine();



   // }

   // const color2Click = () => {
   //    // window.scene.groupApplyState("Millenio_WIFI_OFF");

   //    // window.storeData.currentState = "slate";
   //    console.log("click2");

   //    // window.localStorage.setItem("position","reset");
   //    // window.localStorage.setItem("color","laptopBlack");
   //    // window.localStorage.removeItem('closeMode');




   //    setOpenCloseOnOff(false);
   //    // setOpenClose("./img/Folio_B.png");
   //    setBackliteOnOff(false);
   //    // setBacklite("./img/stylus_W.sec.png");
   //    // setLaptop360FrontImg("./img/front360_black.png");
   //    // setLaptop360TopImg("./img/top360.png");
   //    // setLaptop360LefttImg("./img/360_left.png");
   //    // setLaptop360RightImg("./img/360_right.png");

   //    // setLaptop360BackImg("./img/360_back.png");
   //    // setLaptop360BottomImg("./img/360_Bottom.png");
   //    // window.scene.groupApplyState("screenfill_180");
   //    setPort2Click(false);
   //    setPort1Click(false);
   //    setPort3Click(false);
   //    setPort4Click(false);


   //    window.localStorage.setItem("Carbon_Fibre",true);
   //    if (window.localStorage.getItem('laptop') == 'laptop360') {
   //       // console.log('a')
   //       //         var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
   //       // alreadySelecte.classList.remove('select');

   //       var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
   //       if (alreadySelecte != null) {
   //          alreadySelecte.classList.remove('select');
   //       }

   //       var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //       if (alreadySelected != null) {
   //          alreadySelected.classList.remove('active');
   //       }
   //       document.getElementById('blackBtn').classList.remove('select');
   //       document.getElementById('blackBtn').classList.remove('active');

   //       document.getElementById('whiteBtn').classList.add('select');
   //       document.getElementById('whiteBtn').classList.add('active');
   //       // window.scene.groupApplyState("Silver");  

   //    }
   //    else if (window.localStorage.getItem('laptop') == 'laptop180') {
   //       // console.log('b')
   //       //         var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
   //       // alreadySelecte.classList.remove('select');

   //       var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
   //       if (alreadySelecte != null) {
   //          alreadySelecte.classList.remove('select');
   //       }

   //       var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //       if (alreadySelected != null) {
   //          alreadySelected.classList.remove('active');
   //       }
   //       document.getElementById('blackBtn').classList.add('select');
   //       document.getElementById('blackBtn').classList.add('active');

   //       document.getElementById('whiteBtn').classList.remove('select');
   //       document.getElementById('whiteBtn').classList.remove('active');


   //       // window.scene.groupApplyState("Carbon_Black");
   //       // window.scene.groupApplyState("screenfill_180");

   //    }

   //    if (window.localStorage.getItem('features') == "folio") {
   //       // window.scene.groupApplyState("Folio_Slate");
   //       // setOpenClose("./img/Folio_W.png");
   //       // console.log("slate se folio ");
   //    }
   //    else if (window.localStorage.getItem('features') == "stylus") {
   //       // window.scene.groupApplyState("Stylus_Slate");
   //       // setOpenClose("./img/Folio_B.png");
   //       // console.log("slate se Stylus_Sky ");
   //    }
   //    else {

   //       // window.scene.groupApplyState("Millenio_5G_ON");
   //    }

   //    if (selectedButton == 'xpsFolioClick' || selectedButton == 'xpsStylusClick') {
   //       // window.scene.groupApplyState("Tab_Reflection_OFF");
   //    }
   //    else {
   //       // window.scene.groupApplyState("Tab_Reflection_ON");
   //    }
   //    window.RT_RecordEvent("Color","Carbon Fiber",window.config.name);
   //    window.scene.clearRefine();
   // }

   // const color3Click = () => {
   //    // window.scene.groupApplyState("Millenio_WIFI_OFF");

   //    // window.storeData.currentState = "slate";
   //    console.log("click3");

   //    // window.localStorage.setItem("position","reset");
   //    // window.localStorage.setItem("color","laptopBlack");
   //    // window.localStorage.removeItem('closeMode');

   //    // setOpenCloseOnOff(false);
   //    // setOpenClose("./img/Folio_B.png");
   //    // setBackliteOnOff(false);
   //    // setBacklite("./img/stylus_W.sec.png");
   //    // setLaptop360FrontImg("./img/front360_black.png");
   //    // setLaptop360TopImg("./img/top360.png");
   //    // setLaptop360LefttImg("./img/360_left.png");
   //    // setLaptop360RightImg("./img/360_right.png");

   //    // setLaptop360BackImg("./img/360_back.png");
   //    // setLaptop360BottomImg("./img/360_Bottom.png");
   //    // window.scene.groupApplyState("screenfill_180");
   //    setPort2Click(false);
   //    setPort1Click(false);
   //    setPort3Click(false);
   //    setPort4Click(false);


   //    window.localStorage.setItem("Carbon_Fibre",true);
   //    if (window.localStorage.getItem('laptop') == 'laptop360') {
   //       // console.log('a')
   //       //         var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
   //       // alreadySelecte.classList.remove('select');

   //       var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
   //       if (alreadySelecte != null) {
   //          alreadySelecte.classList.remove('select');
   //       }

   //       var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //       if (alreadySelected != null) {
   //          alreadySelected.classList.remove('active');
   //       }
   //       document.getElementById('pinkBtn').classList.remove('select');
   //       document.getElementById('pinkBtn').classList.remove('active');

   //       document.getElementById('pinkBtn').classList.add('select');
   //       document.getElementById('pinkBtn').classList.add('active');
   //       // window.scene.groupApplyState("Silver");  

   //    }
   //    else if (window.localStorage.getItem('laptop') == 'laptop180') {
   //       // console.log('b')
   //       //         var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
   //       // alreadySelecte.classList.remove('select');

   //       var alreadySelecte = document.querySelector('.MuiAccordionDetails-root.select');
   //       if (alreadySelecte != null) {
   //          alreadySelecte.classList.remove('select');
   //       }

   //       var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //       if (alreadySelected != null) {
   //          alreadySelected.classList.remove('active');
   //       }
   //       document.getElementById('pinkBtn').classList.add('select');
   //       document.getElementById('pinkBtn').classList.add('active');

   //       document.getElementById('pinkBtn').classList.remove('select');
   //       document.getElementById('pinkBtn').classList.remove('active');


   //       // window.scene.groupApplyState("Carbon_Black");
   //       // window.scene.groupApplyState("screenfill_180");

   //    }

   //    if (window.localStorage.getItem('features') == "folio") {
   //       // window.scene.groupApplyState("Folio_Slate");
   //       // setOpenClose("./img/Folio_W.png");
   //       // console.log("slate se folio ");
   //    }
   //    else if (window.localStorage.getItem('features') == "stylus") {
   //       // window.scene.groupApplyState("Stylus_Slate");
   //       // setOpenClose("./img/Folio_B.png");
   //       // console.log("slate se Stylus_Sky ");
   //    }
   //    else {

   //       // window.scene.groupApplyState("Millenio_5G_ON");
   //    }

   //    if (selectedButton == 'xpsFolioClick' || selectedButton == 'xpsStylusClick') {
   //       // window.scene.groupApplyState("Tab_Reflection_OFF");
   //    }
   //    else {
   //       // window.scene.groupApplyState("Tab_Reflection_ON");
   //    }
   //    window.RT_RecordEvent("Color","Carbon Fiber",window.config.name);
   //    window.scene.clearRefine();
   // }
   //Menu Position

   const [port1Click,setPort1Click] = useState(false);
   const [port2Click,setPort2Click] = useState(false);
   const [port3Click,setPort3Click] = useState(false);
   const [port4Click,setPort4Click] = useState(false);
   const [port5Click,setPort5Click] = useState(true);

   const [nextClick,setNextClick] = useState(false);
   const [prevClick,setPrevClick] = useState(false);

   // const TentModeClick = () => {
   //    // console.log(position.tent,position.currentPos)

   //    //Update ZoomBar
   //    var slider = document.getElementById("sliderRange");

   //    if (slider != null) {
   //       document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
   //       setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
   //    }

   //    var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //    if (alreadySelected != null) {
   //       alreadySelected.classList.remove('active');
   //    }

   //    document.getElementById('tentBtn').classList.add('active');
   //    // window.scene.groupApplyState("screen_360");

   //    selectedButton = 'TentModeClick';
   //    if (!(mob || isipad)) {
   //       document.getElementById('previousView').setAttribute('aria-label','Tent Mode');

   //       document.getElementById('nextView').setAttribute('aria-label','Tent Mode');
   //    }
   //    setOpenCloseOnOff(false);
   //    setOpenClose("./img/Lid_open.svg");
   //    setBackliteOnOff(false);
   //    setBacklite("./img/Backlite_Off.svg");
   //    // window.localStorage.removeItem('hotspot');
   //    GotoPosInTimeNamedValue('Tent_Cam_F53_Tent',function () {
   //       // window.scene.groupApplyState("GP_tent");
   //    });

   //    var currentPosName = position.currentPos;
   //    if (position.tent == position[currentPosName]) { position.currentPos = 'tent'; return; }
   //    window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.tent,animTime,undefined,undefined,undefined,true,position[currentPosName],4);
   //    window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.tent,animTime,undefined,undefined,undefined,true,position[currentPosName],4);

   //    window.RT_RecordEvent("Positions","Tent",window.config.name);
   //    window.scene.clearRefine();
   //    position.currentPos = 'tent';

   // }

   // const TheaterModeClick = () => {
   //    // console.log(position.theatre,position.currentPos)

   //    //Update ZoomBar
   //    var slider = document.getElementById("sliderRange");

   //    if (slider != null) {
   //       document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
   //       setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
   //    }

   //    var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //    if (alreadySelected != null) {
   //       alreadySelected.classList.remove('active');
   //    }

   //    document.getElementById('theaterBtn').classList.add('active');
   //    // window.scene.groupApplyState("screen_180");

   //    // window.localStorage.removeItem('closeMode')
   //    selectedButton = 'TheaterModeClick';
   //    if (!(mob || isipad)) {
   //       document.getElementById('previousView').setAttribute('aria-label','Theater Mode');

   //       document.getElementById('nextView').setAttribute('aria-label','Theater Mode');
   //    }
   //    // window.scene.groupApplyState("Backlit_OFF");
   //    // window.scene.groupApplyState("all_GP_off");
   //    setOpenCloseOnOff(false);
   //    setOpenClose("./img/Lid_open.svg");
   //    setBackliteOnOff(false);
   //    setBacklite("./img/Backlite_Off.svg");

   //    // window.localStorage.removeItem('hotspot');
   //    GotoPosInTimeNamedValue('Render_Cam_F100_Stand');

   //    var currentPosName = position.currentPos;
   //    if (position.theatre == position[currentPosName]) { position.currentPos = 'theatre'; return; }
   //    window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.theatre,animTime,undefined,undefined,undefined,true,position[currentPosName],9);
   //    window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.theatre,animTime,undefined,undefined,undefined,true,position[currentPosName],4);

   //    window.RT_RecordEvent("Positions","Theatre",window.config.name);
   //    window.scene.clearRefine();
   //    position.currentPos = 'theatre';

   // }
   // const TabletModeClick = () => {
   //    // console.log(position.tent,position.currentPos)

   //    //Update ZoomBar
   //    var slider = document.getElementById("sliderRange");

   //    if (slider != null) {
   //       document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
   //       setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
   //    }

   //    var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
   //    if (alreadySelected != null) {
   //       alreadySelected.classList.remove('active');
   //    }


   //    document.getElementById('tabletBtn').classList.add('active');
   //    // window.scene.groupApplyState("screen_180");
   //    // window.scene.groupApplyState("all_GP_off");

   //    selectedButton = 'TabletModeClick';
   //    if (!(mob || isipad)) {
   //       document.getElementById('previousView').setAttribute('aria-label','Tablet Mode');

   //       document.getElementById('nextView').setAttribute('aria-label','Tablet Mode');
   //    }
   //    // window.scene.groupApplyState("Backlit_OFF");
   //    setOpenCloseOnOff(false);
   //    setOpenClose("./img/Lid_open.svg");
   //    setBackliteOnOff(false);
   //    setBacklite("./img/Backlite_Off.svg");

   //    // window.localStorage.removeItem('hotspot');
   //    GotoPosInTimeNamedValue(window.config.close);

   //    var currentPosName = position.currentPos;
   //    if (position.tablet == position[currentPosName]) { position.currentPos = 'tablet'; return; }
   //    window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.tablet,animTime,undefined,undefined,undefined,true,position[currentPosName],10);
   //    window.scene.animPlayAllChildrenInTime("CA_Precision_3581",position.tablet,animTime,undefined,undefined,undefined,true,position[currentPosName],10);

   //    window.RT_RecordEvent("Positions","Tablet",window.config.name);
   //    window.scene.clearRefine();
   //    position.currentPos = 'tablet';
   // }
   const reverseAll = () => {
      // window.scene._nav._navMinDolly = 13.0; //110
      // window.scene._nav._navMaxDolly = 28.0; //110
      window.scene._nav._panMax = [15,10];    //[left, bottom];
      // window.scene._nav._panMin = [-15,-7];
      // window.scene.groupApplyState("internal_off");
      // window.scene.groupApplyState("Internals_OFF");
      // window.scene.animPlayInTime("D_COVER",0,0);
      window.scene.groupApplyState("SPOT_OFF");
      window.scene.groupApplyState("Backlight_OFF");
      //  window.scene.animPlayInTime("SCREEN",0,0);
        window.scene.animPlayInTime("CA_Precision_3581",0,0);
      var center = [0,0,0];
      window.scene._nav.SetRotationCenter(center);

   }
   const resetMode = () => {
      selectedButton = 'onResetMode';
      console.log("reset");
      GotoPosInTimeNamedValue(window.config.default,function () { })
      if (!(mob || isipad)) {
         document.getElementById('previousView').setAttribute('aria-label','Reset Mode');

         document.getElementById('nextView').setAttribute('aria-label','Reset Mode');
      }
   }
   const onResetMode = () => {
      //Update ZoomBar
      // console.log('on reset mode ')
      // console.log(position.tent,position.currentPos)

      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }

      // var alreadySelected = document.querySelector('.MuiAccordionDetails-root.active');
      //   alreadySelected.classList.remove('active');

      // document.getElementById('whiteBtn').classList.add('active');


      // selectedButton = 'onResetMode';

      if (selectedButton == 'onFrontClick') {
         // console.log("front onreset")
         GotoPosInTimeNamedValue(window.config.front,function () {

         });
         onFrontClick();
      }
      else if (selectedButton == 'onBackClick') {
         // console.log("back onreset")

         GotoPosInTimeNamedValue(window.config.back,function () {

         });
         onBackClick();
      }
      else if (selectedButton == 'onTopClick') {
         // console.log("top onreset")

         GotoPosInTimeNamedValue(window.config.top,function () {
            var center = [0,8.926640999999999,0];
            window.scene._nav.SetRotationCenter(center);
         });
         onTopClick();
      }
      else if (selectedButton == 'onRightClick') {
         onRightClick();
         GotoPosInTimeNamedValue(window.config.right,function () {
            window.hotspot = "right"

         })

      }
      else if (selectedButton == 'onLeftClick') {
         onLeftClick();
         GotoPosInTimeNamedValue(window.config.left,function () {
            window.hotspot = "left"

         })
      }
      // else if (selectedButton == 'onExplodeClick') {
      //    onExplodeClick();
      // }

      else if (selectedButton == 'backliteClick') {
         // window.scene._nav._navMaxDolly = 28.0; //110
         // window.scene._nav._panMax = [15,10];    //[left, bottom];
         // window.scene._nav._panMin = [-15,-7];
         // window.scene.groupApplyState("internal_off");
         // window.scene.groupApplyState("Internals_OFF");
         // window.scene.animPlayInTime("D_COVER",0,0);
         // window.scene.groupApplyState("Open_Laptop");
         var center = [0,0,0];
         window.scene._nav.SetRotationCenter(center);
         // window.scene.groupApplyState("screen_180");
         //   window.scene.groupApplyState("dynamic_reset");
         // backliteClick();
         GotoPosInTimeNamedValue(window.config.top,function () {
            //   window.localStorage.setItem('hotspot','backlit');
            window.scene.clearRefine()
         })

      }
      else if (selectedButton == 'FPRClick') {
         var center = [0,0,0];
         window.scene._nav.SetRotationCenter(center);

         if (FPROnOff) {
            setFPROnOff(false);

            GotoPosInTimeNamedValue(window.config.top,function () {
               // window.localStorage.setItem('hotspot','FPROff');
               var center = [0,8.926640999999999,0];
               window.scene._nav.SetRotationCenter(center);

            })
         } else {
            setFPROnOff(true);

            GotoPosInTimeNamedValue(window.config.top,function () {
               // window.localStorage.setItem('hotspot','FPROn');
               var center = [0,8.926640999999999,0];
               window.scene._nav.SetRotationCenter(center);
            })
         }
         window.scene.clearRefine();

      }
      else if (selectedButton == 'openCloseClick') {
         if (openCloseOnOff) {
            GotoPosInTimeNamedValue(window.config.close,function () {
            });

         } else {
            GotoPosInTimeNamedValue(window.config.default,function () {
               // var center = [0,8.926640999999999,0];
               // window.scene._nav.SetRotationCenter(center);

            });
         }

      } else if (selectedButton == 'onResetMode') {
         resetMode()
         // GotoPosInTimeNamedValue(window.config.default,function () { })
      }
      window.scene.clearRefine();

   }

   const onPreviousMode = () => {

      //Update ZoomBar
      var slider = document.getElementById("sliderRange");

      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      // alert(selectedButton)
      if (laptop180) {
         var prevButton;
         var selectedButtonIndex = buttonSeq180.findIndex(element => element === selectedButton)
         if (selectedButton == 'onFrontClick' || selectedButton == 'onResetMode') {
            prevButton = 'openCloseClick';
            setExpandedPanel("panel3");
         } else {
            prevButton = buttonSeq180[selectedButtonIndex - 1];
         }
      }
      else {
         var prevButton;
         var selectedButtonIndex = buttonSeq.findIndex(element => element === selectedButton)

         if (selectedButton == 'onFrontClick' || selectedButton == 'onResetMode') {
            prevButton = 'openCloseClick';
            setExpandedPanel("panel3");
         }
         else {
            prevButton = buttonSeq[selectedButtonIndex - 1];
         }
      }

      if (prevButton == 'onFrontClick') {
         setExpandedPanel("panel1");
         onFrontClick(true);
      }
      else if (prevButton == 'onTopClick') {
         setExpandedPanel("panel1");
         onTopClick(true);
      }
      else if (prevButton == 'onRightClick') {
         onRightClick(true);
         setExpandedPanel("panel1");
      }
      else if (prevButton == 'onLeftClick') {
         onLeftClick(true);
         setExpandedPanel("panel1");
      }
      else if (prevButton == 'onBackClick') {
         onBackClick(true);
         setExpandedPanel("panel1");
      }
      // else if (prevButton == 'onExplodeClick') {
      //    onExplodeClick(true);
      //    setExpandedPanel("panel1");
      // }
      else if (prevButton == 'backliteClick') {
         setExpandedPanel("panel3");
         backliteClick(true);
      }
      else if (prevButton == 'FPRClick') {
         setExpandedPanel("panel3");
         FPRClick(true);
      }
      else if (prevButton == 'openCloseClick') {
         setExpandedPanel("panel3")
         openCloseClick(true);
      }
      return false;

   }


   const onNextMode = () => {

      //Update ZoomBar
      var slider = document.getElementById("sliderRange");
      if (slider != null) {
         document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor();
         setTimeout(function () { document.getElementById("sliderRange").value = window.scene._nav.getZoomFactor(); },1000);
      }
      if (laptop180) {

         var nextButton;
         var selectedButtonIndex = buttonSeq180.findIndex(element => element === selectedButton)
         if (selectedButton == 'backliteClick') {
            nextButton = 'onFrontClick';
            setExpandedPanel("panel1");
         } else {
            nextButton = buttonSeq180[selectedButtonIndex + 1];
         }
      }
      else {
         var nextButton;
         var selectedButtonIndex = buttonSeq.findIndex(element => element === selectedButton)
         if (selectedButton == 'onResetMode') {
            nextButton = 'onFrontClick';
            setExpandedPanel("panel1");
         }
         else if (selectedButton == 'openCloseClick') {
            nextButton = 'onFrontClick';
            setExpandedPanel("panel1");
         } else {
            nextButton = buttonSeq[selectedButtonIndex + 1];
         }
      }
      // alert(laptop180)



      if (nextButton == 'onFrontClick') {
         onFrontClick(true);
         setExpandedPanel("panel1");

      }
      else if (nextButton == 'onTopClick') {
         onTopClick(true);
         setExpandedPanel("panel1");

      }
      else if (nextButton == 'onRightClick') {
         onRightClick(true);
         setExpandedPanel("panel1");

      }
      else if (nextButton == 'onLeftClick') {
         onLeftClick(true);
         setExpandedPanel("panel1");
      }
      else if (nextButton == 'onBackClick') {
         onBackClick(true);
         setExpandedPanel("panel1");
      }
      // else if (nextButton == 'onExplodeClick') {
      //    onExplodeClick(true);
      //    setExpandedPanel("panel1");
      // }

      else if (nextButton == 'FPRClick') {
         FPRClick(true);
         setExpandedPanel("panel3");
      }
      else if (nextButton == 'openCloseClick') {
         openCloseClick(true);
         setExpandedPanel("panel3");
      }
      else if (nextButton == 'backliteClick') {
         backliteClick(true);
         setExpandedPanel("panel3");
      }
      return false;
   }

   const [animValue,setAnimValue] = useState("On");

   const [animValue1,setAnimValue1] = useState("On");

   useEffect(() => {
      // console.log('useeffect working');
      window.localStorage.setItem('Animation','on');
      setAnimValue("On");
      document.getElementById("animSwitchValue").checked = true;
      document.getElementsByClassName('onOff')[0].style.left = "-17px";
      if (!(window.mob)) {
         document.getElementById("animSwitchValue1").setAttribute('aria-label','Animation On')
         // document.getElementById('animSwitchValue1').setAttribute('aria-label','clickable checkbox checked On');

         setAnimValue1("On");
         document.getElementById("animSwitchValue1").checked = true;
         document.getElementsByClassName('onOff1')[0].style.left = "-17px";
      }

   },[]);


   const setAnimationSwitch = (e) => {
      console.log(e)
      // displayName(e);
      const isChecked = document.getElementById("animSwitchValue").checked;

      if (isChecked == true) {
         //document.getElementById("animSwitchValue").setAttribute('aria-label', 'Animation Off');
         document.getElementById("animSwitchValue").checked = false;
         setAnimValue("Off");
         document.getElementsByClassName('onOff')[0].style.left = "9px";
         window.localStorage.setItem('Animation','off');
         window.RT_RecordEvent("Animations","Off",window.config.name);

         // alert("Animation On");

      } else {
         // document.getElementById("animSwitchValue").setAttribute('aria-label', 'Animation On')
         document.getElementById("animSwitchValue").checked = true;

         setAnimValue("On");
         window.localStorage.setItem('Animation','on');
         document.getElementsByClassName('onOff')[0].style.left = "-17px";
         // alert("Animation Off");
         window.RT_RecordEvent("Animations","On",window.config.name);
      }
   }
   const displayName = (e) => {
      // console.log(e)
      const isChecked = document.getElementById("animSwitchValue").checked;

      if (isChecked == true) {
         setAnimValue("On");
         window.localStorage.setItem('Animation','on');
         document.getElementsByClassName('onOff')[0].style.left = "-17px";
         document.getElementById('animSwitchValue').setAttribute('aria-label','clickable checkbox checked On');
         // alert("Animation On");

      } else {
         setAnimValue("Off");
         document.getElementsByClassName('onOff')[0].style.left = "9px";
         window.localStorage.setItem('Animation','off');
         document.getElementById('animSwitchValue').setAttribute('aria-label','clickable checkbox checked Off');
         // alert("Animation Off");

      }

   }

   const setAnimationSwitch1 = (e) => {
      // console.log(e)
      // displayName(e);
      const isChecked = document.getElementById("animSwitchValue1").checked;

      if (isChecked == true) {
         //document.getElementById("animSwitchValue").setAttribute('aria-label', 'Animation Off');
         document.getElementById("animSwitchValue1").checked = false;
         setAnimValue1("Off");
         // keyboardOff();
         document.getElementsByClassName('onOff1')[0].style.left = "9px";
         // window.localStorage.setItem('Animation1','off');
         window.animationSwitchVal = 'off';
         window.animationSwitchGlobal = 'off';


      } else {
         // document.getElementById("animSwitchValue").setAttribute('aria-label', 'Animation On')
         document.getElementById("animSwitchValue1").checked = true;

         setAnimValue1("On");
         window.animationSwitchVal = 'on';
         // keyboardOn();
         // window.localStorage.setItem('Animation1','on');
         window.animationSwitchGlobal = 'on';
         document.getElementsByClassName('onOff1')[0].style.left = "-17px";

      }


   }
   var animStopped = true;
   const displayName1 = (e) => {
      if (animStopped == false) {
         return;
         animStopped = false;
      }
      // console.log(e)
      const isChecked = document.getElementById("animSwitchValue1").checked;

      if (isChecked == true) {
         setAnimValue1("On");
         // keyboardOn();
         // window.localStorage.setItem('Animation1','on');
         window.animation1SwitchGlobal = 'on';
         document.getElementsByClassName('onOff1')[0].style.left = "-17px";
         document.getElementById('animSwitchValue1').setAttribute('aria-label','clickable checkbox checked On');
         window.animationSwitchVal = 'on';

         if (mob) {
            document.getElementById('footerControls').removeAttribute('style');
            document.getElementById('footerControMob').style.display = 'block';
         }
         else if (isipad) {
            // console.log('portrait');
            document.getElementById('footerControMob').style.display = 'block';
            document.getElementById('footerControls').style.display = 'block';
         }
         else {
            // console.log("show");

            document.getElementById('footerControls').style.transition = "bottom 0.2s linear";
            document.getElementById('footerControls').style.bottom = "20px";
            /*  document.getElementById('footerControMob').style.transition = "bottom 0.2s linear";
             document.getElementById('footerControMob').style.bottom = "20px"; */

            document.getElementById('footerControls').style.visibility = "";
            document.getElementById('footerControIpad').style.visibility = "";
            //document.getElementById('footerControMob').style.visibility = "";

         }


      } else {
         setAnimValue1("Off");
         // keyboardOff();
         document.getElementsByClassName('onOff1')[0].style.left = "9px";
         // window.localStorage.setItem('Animation1','off');
         window.animation1SwitchGlobal = 'off';

         document.getElementById('animSwitchValue1').setAttribute('aria-label','clickable checkbox checked Off');

         if (mob) {
            document.getElementById('footerControls').removeAttribute('style');
            document.getElementById('footerControMob').style.display = 'none';
         } else if (isipad) {
            // console.log('landscape');
            document.getElementById('footerControMob').style.display = 'none';
            document.getElementById('footerControls').style.display = 'none';
         }
         else {
            // console.log("hide");
            //document.getElementById('footerControls').style.transition = "bottom 0.2s linear";
            document.getElementById('footerControls').style.bottom = "-112px";
            /*  document.getElementById('footerControMob').style.transition = "bottom 0.24s linear";
             document.getElementById('footerControMob').style.bottom = "-49px"; */
            setTimeout(function () {

               document.getElementById('footerControls').style.visibility = "hidden";
               document.getElementById('footerControIpad').style.visibility = "hidden";

               //document.getElementById('footerControMob').style.visibility = "hidden";

               animStopped = true;
            },150);
         }

      }

   }


   return (
      <>
         {/* <Hidden only={["xs",'sm']}> */}
         {!window.mob && <HowToUse />}
         {/* </Hidden> */}
         <Hidden only={['sm','md','lg','xl']}>

            <Button style={{ position: 'fixed',backgroundColor: '#F0F0F0',width: '100%',height: '56px',paddingTop: '15px',paddingBottom: '15px',zIndex: '1',border: '1px solid #E1E1E1',borderLeft: "none",borderRight: "none",borderRadius: "0",margin: "-1px 0px 0px 0px" }}
               variant="outlined"
               color="primary"
               // className={classes.button}
               endIcon={<img src="./img/cross.svg" alt="cross" style={{ marginLeft: '207px',height: '23px' }} />}
               onClick={props.toggleDrawerAction}
            >
               {window.finalLangues.mainmenu}
            </Button>
            <Howtousenew />

         </Hidden >
         <Hidden only={['md','lg','xl','xs']}>
            {moblandscap && <Howtousenew />}
         </Hidden>

         <Hidden only={["xs"]}>
            <FooterControl name="reset and next previous" onReset={onResetMode} onPrevious={onPreviousMode} onNext={onNextMode} />
         </Hidden>
         <Hidden only={['lg','xl']}>
            <FooterControlMob onResetMob={onResetMode} onPreviousMob={onPreviousMode} onNextMob={onNextMode} onResetIpad={onResetMode} onNextIpad={onNextMode} onPreviousIpad={onPreviousMode} />
         </Hidden>
         {/* <MenuColors name={window.finalLangues.colors} tabIndex="1" onWhiteBtnClick={color1Click} onBlackBtnClick={color2Click}  onPinkBtnClick={color3Click} expanded={expandedPanel === 'panel4'} onChanged={handleAccordionChange('panel4')} /> */}
         <MenuProductView tabIndex="1" onFrontBtnClick={onFrontClick} onTopBtnClick={onTopClick} onLeftBtnClick={onLeftClick} onRightBtnClick={onRightClick} onBackBtnClick={onBackClick} imgfront={laptop360FrontImg} imgtop={laptop360TopImg} imgleft={laptop360LeftImg} imgright={laptop360RightImg} imgback={laptop360BackImg} imgexplode={laptopExplodeImg} name={window.finalLangues.productView} expanded={expandedPanel === 'panel1'} onChanged={handleAccordionChange('panel1')} />
         {/* onExplodeBtnClick={onExplodeClick} */}
         <MenuFeatures name={window.finalLangues.feature} tabIndex="1" tobechange={opneClose} tobeChanged={backlit} ChangeFPRIcon={FPRIcon} openClosedClicked={openCloseClick} expanded={expandedPanel === 'panel3'} onOffBackliteClicked={backliteClick} OnOffFPRclick={FPRClick} onChanged={handleAccordionChange('panel3')} />
         {/* onOffBackliteClicked={backliteClick}  */}
         <AnimationBtn onchange={displayName} forKeypress={setAnimationSwitch} value={animValue} onchange1={displayName1} forKeypress1={setAnimationSwitch1} value1={animValue1} />

      </>
   );
}

export default MainMenu;