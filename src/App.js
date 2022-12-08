import { makeStyles } from '@material-ui/core/styles';
import DehazeIcon from '@material-ui/icons/Dehaze';
import Button from '@material-ui/core/Button';
import React,{ useState,useEffect } from 'react';
import Drawer from "@material-ui/core/Drawer";
import NestedList from './NestedList';

import MainMenu from "./components/MenuComponents/MainMenu";
import "./App.css";
import Hidden from '@material-ui/core/Hidden';
// import Header from './components/Header';
import CloseIcon from '@material-ui/icons/Close';
// import BoxTest from './components/breakpoints';
// import { ThemeProvider } from '@material-ui/core/styles';
// import { createMuiTheme } from '@material-ui/core/styles';
var ipad = navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && (navigator.userAgent.indexOf("iPhone") == -1);
var ipadPortrait = !(ipad && window.innerHeight > window.innerWidth);
var mob = (navigator.userAgent.indexOf("iPhone") != -1) || ((navigator.userAgent.indexOf("Android") != -1) || (navigator.userAgent.indexOf("Mobile") != -1)) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1) || (navigator.userAgent == "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Safari/605.1.15");


const statebtns = {
   border: "1px solid #c7c7c7",
   borderRadius: "0px",
   right: "0",
   width: "100%",
   height: '56px',
   marginLeft: "0px",
   borderLeft: "0px",
   borderRight: "0px",
   position: "fixed",
   bottom: "0px",
   marginBottom: '0px',
   backgroundColor: 'white',
   border: '1px solid #B6B6B6'
}

// const CloseBtn={
//   borderLeft: "none",
//   borderRight: "none",
//   borderRadius: "0",
//   position: "fixed",
//   background: "#fff",
//   width: "100%",
//   zIndex: "1",
// }

const useStyles = makeStyles((theme) => ({
   button: {
      margin: theme.spacing(1),
   },

   drawerPaper: {
      width: 'auto',
      width: '285px !important',
      overflow: 'visible',
      top: '9%'
      //background: "#c7addd"

   },

   root: {
      width: 'auto',
      /*     '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          }, */
      //marginRight: '5vh',
      //maxWidth: 360,
      //backgroundColor: theme.palette.background.paper,
   },

   nested: {
      paddingLeft: theme.spacing(4),
   },

   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   },

   selectEmpty: {
      marginTop: theme.spacing(2),
   },
}));


function App() {

   const classes = useStyles();

   //States for opening Drawer
   const [state,setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
   });

   const [burgerBtnVisible,setBurgerBtnVisible] = useState(true);

   //Open Drawer
   const toggleDrawer = (anchor,open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {

         return;
      }


      //Open Drawer states
      setState({ ...state,[anchor]: open });
   };
   const mobCloseDrawer = () => {
      // var currentHotspot = window.localStorage.getItem('hotspot');
      // alert(currentHotspot)
      window.canvasLandscapeMarginTop = false;
      setState({ ...state,["bottom"]: false });
      setTimeout(() => {
         document.getElementById("footerControMob").style.display = "block";
         document.getElementById("infinityrt-canvas").style.marginTop = "0px";
         document.getElementById("calloutcanvas").style.marginTop = "0px";

      },270)

      // toggleDrawer("bottom", false)
   }
   const mobOpenDrawer = () => {
      // var currentHotspot = window.localStorage.getItem('hotspot');
      // alert(currentHotspot)
      window.canvasLandscapeMarginTop = true;
      setState({ ...state,["bottom"]: true });
      document.getElementById("infinityrt-canvas").style.marginTop = "-150px";
      document.getElementById("calloutcanvas").style.marginTop = "-150px";

      document.getElementById("footerControMob").style.display = "none";
      // toggleDrawer("bottom", false)
   }

   const menuMobLandscapOpen = () => {
      setState({ ...state,["left"]: true });
      setBurgerBtnVisible(false);
      // toggleDrawer("left", true)
      if (ipad) {
         document.getElementById('footerControMob').style.zIndex = 2;
      } else if (mob) {
         document.getElementById('footerControMob').style.zIndex = 0;
         // document.getElementById("infinityrt-canvas").style.marginTop = "0px";
         // document.getElementById("calloutcanvas").style.marginTop = "0px";

      }
   }
   const menuMobLandscapClose = () => {
      setState({ ...state,["left"]: false });
      setBurgerBtnVisible(true);
      // if(ipad){
      // document.getElementById('footerControMob').style.zIndex = 2;}else if(mob){
      document.getElementById('footerControMob').style.zIndex = 2;
      // document.getElementById("infinityrt-canvas").style.marginTop = "0px";
      // document.getElementById("calloutcanvas").style.marginTop = "0px";
      // }
      // toggleDrawer("left", false)
   }
   const [orientationPotrait,setOrientation] = useState(true);
   window.checkOrientationStatus = (orientationStatus) => {
      // alert(window.screen.orientation.type);
      setOrientation(orientationStatus);
   }
   useEffect((event) => {
    

      if (window.innerHeight > window.innerWidth) {
         // setBurgerBtnVisible(false);
      }

      return () => {
         return false
      }


   },[])
   useEffect((event) => {
      ipadPortrait = !(ipad && window.innerHeight > window.innerWidth);
      // alert(orientationPotrait);
      return () => {
         return false
      }

   })
   const [getLangTranscript,setgetLangTranscript] = useState(false);
   window.checkgetLangTranscript = (getLangTranscript) => {
      // alert(window.screen.orientation.type);
      setgetLangTranscript(getLangTranscript);
   }

   let closeBtnVisibilityOpen = burgerBtnVisible && window.innerWidth > window.innerHeight;
   let closeBtnVisibilityClose = !burgerBtnVisible && window.innerWidth > window.innerHeight;
   return (
      <>
         {/* <Header/> */}


         <div id="menubar" className={classes.root}>
            {/* Desktop start no open btn */}
            <Hidden only="xs">

               <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  style={{ display: "none" }}
                  className={classes.button}
                  startIcon={<DehazeIcon />}
                  disableElevation
                  onClick={toggleDrawer("left",true)}
               >
                  States Desktop
               </Button>
            </Hidden>
            {/* desktop end */}

            {/* Ipad with open btn */}

            <Hidden only={['xs','lg']}>
               {window.innerWidth < window.innerHeight && <Button variant="outlined" color="primary" size="large" className="openCloseBtn" style={{ display: orientationPotrait == true ? "block" : "none",maxWidth: '62px;'}} startIcon={<DehazeIcon />} disableElevation onClick={menuMobLandscapOpen}> </Button>}
               {closeBtnVisibilityOpen && <Button variant="outlined" color="primary" size="large" className="openCloseBtn" style={{ display: orientationPotrait == true ? "block" : "none",maxWidth: '62px;' ,display:"none"}} startIcon={<DehazeIcon />} disableElevation onClick={menuMobLandscapOpen}> </Button>}

               <div className="openCloseBar" style={{}}></div>

               {closeBtnVisibilityClose && <Button variant="outlined" color="primary" size="large" className="openCloseBtn closeBtnMobLAndscap" style={{ display: orientationPotrait == true ? "block" : "none",maxWidth: '62px;' }} startIcon={<CloseIcon />} onClick={menuMobLandscapClose} > </Button>}
            </Hidden>

            {/* Ipad end */}

            {/* Mobile Start */}
            <Hidden only={['sm','md','lg','xl']}>

               <Button
                  variant="outlined"
                  color="primary"
                  size="large"

                  endIcon={<img src="./img/menu.svg" alt="menu" style={{ marginLeft: '190px',width: '23px',height: '21px' }} />}
                  disableElevation
                  onClick={mobOpenDrawer}
                  style={statebtns}
                  only='xs'
               >
                  <span>
                     Main Menu
                  </span>
               </Button>
            </Hidden>
            {/* mobile end */}
            {/* <Hidden only={['xs','lg','xl']}>
      <MenuIcon id="openMenu" style={menuIconStyle} onClick={menuSlider}/>
      <CloseIcon id="closeMenu" style={menuIconClose} onClick={menuSliderClose} />
      </Hidden> */}
            {/* for close mode */}
            <div id='leftPan'
               tabIndex={0}
            // role="button"
            //onClick={toggleDrawer("left", false)}
            //onKeyDown={toggleDrawer("left", false)}
            >
               {/* for ipadPro start */}
               <Hidden only={['xs','sm','md']}>
                  {ipadPortrait && orientationPotrait == true &&
                     <Drawer id="LeftMenuWrapper" anchor={"left"} open={true} variant="persistent" style={{ border: "none" }} onClose={toggleDrawer("left",false)} classes={{ paper: classes.drawerPaper }}>
                        <NestedList />
                        {/* <Guide /> */}
                        {getLangTranscript && <MainMenu />}
                     </Drawer>
                  }
               </Hidden>
               {/* ipadPro End */}
               <Hidden only={['xs','sm']}>
                  {
                     window.innerWidth > window.innerHeight && orientationPotrait == false &&
                     <Drawer id="LeftMenuWrapper" anchor={"left"} open={true} variant="persistent" style={{ border: "none" }} onClose={toggleDrawer("left",false)} classes={{ paper: classes.drawerPaper }}>
                        <NestedList />
                        {/* <Guide /> */}
                        {getLangTranscript && <MainMenu />}
                     </Drawer>
                  }
               </Hidden>
               {/* ipad start */}
               <Hidden only={['xs','lg','xl']}>

                  <Drawer anchor={"left"} open={state["left"]} variant="persistent" onClose={toggleDrawer("left",false)} classes={{ paper: classes.drawerPaper }}>

                     <Button
                        variant="outlined"
                        color="secondary"
                        size="large"
                        className="closeBtn"
                        // style={{display:"block",border: '1px solid #E1E1E1',position: 'absolute',top: '0px',left: '-64px', margin:'0',backgroundColor: '#FFFFFF',paddingBottom: '16px', width: '60px'}}
                        startIcon={<CloseIcon style={{ marginLeft: '4px' }} />}
                        onClick={toggleDrawer("left",false)}

                     >

                     </Button>

                     {/*               <div className={classes.root}>
              <TextField id="outlined-search" label="Rotation Speed 0.2-0" type="number" variant="outlined" defaultValue={0.02} onChange={handleRotation} />
              <TextField id="outlined-search" label="Zoom Speed 0.01-0" type="number" variant="outlined" defaultValue={0.002} onChange={handleDolly} /><br />
              <TextField id="outlined-search" label="Pan Speed 0.1-0" type="number" variant="outlined" defaultValue={0.04} onChange={handlePan} />
              <TextField id="outlined-search" label="Decay 1-0" type="number" variant="outlined" defaultValue={0.85} onChange={handleDecay} /><br />
              <TextField id="outlined-search" label="Decay Life 0-Infinity" type="number" variant="outlined" defaultValue={150} onChange={handleDecayHalfLife} />
              <TextField id="outlined-search" label="Touch Sensibility" type="number" variant="outlined" defaultValue={5.0} onChange={handleTouch} /><br />
              <TextField id="outlined-search" label="Touch Pan Zoom" type="number" variant="outlined" defaultValue={10.0} onChange={handleTouchZoomPan} />
              </div> */}

                     {/* <Divider /> */}
                     <NestedList />
                     {/* <Guide /> */}
                     {getLangTranscript && <MainMenu />}
                  </Drawer>
               </Hidden>
               {/* ipadEnd */}

               {/* mobile start */}
               <Hidden only={['sm','md','lg','xl']}>

                  <Drawer only='xs' style={{ width: "100%",maxWidth: "105vw",overflowY: "auto",overflowX: 'hidden',width: 'auto',minWidth: '140px',maxWidth: '35vw',}} anchor={"bottom"} open={state["bottom"]} variant="persistent" onClose={toggleDrawer("bottom",false)}>
                     {/* <Button style={{position: 'fixed', bottom:'45%', backgroundColor: '#F0F0F0', width: '100%', height: '56px', zIndex: '1', border: '1px solid #E1E1E1', borderLeft: "none",borderRight: "none",borderRadius: "0",margin:"0" }}
                variant="outlined"
                color="primary"
                className={classes.button}
                endIcon={<img src="./img/cross.svg" alt="cross" style={{marginLeft:'207px', height: '23px'}} />}
                onClick={toggleDrawer("bottom", false)}
                
              >
                Main Menu tttttt
              </Button>  */}

                     {/*               <div className={classes.root}>
              <TextField id="outlined-search" label="Rotation Speed 0.2-0" type="number" variant="outlined" defaultValue={0.02} onChange={handleRotation} />
              <TextField id="outlined-search" label="Zoom Speed 0.01-0" type="number" variant="outlined" defaultValue={0.002} onChange={handleDolly} /><br />
              <TextField id="outlined-search" label="Pan Speed 0.1-0" type="number" variant="outlined" defaultValue={0.04} onChange={handlePan} />
              <TextField id="outlined-search" label="Decay 1-0" type="number" variant="outlined" defaultValue={0.85} onChange={handleDecay} /><br />
              <TextField id="outlined-search" label="Decay Life 0-Infinity" type="number" variant="outlined" defaultValue={150} onChange={handleDecayHalfLife} />
              <TextField id="outlined-search" label="Touch Sensibility" type="number" variant="outlined" defaultValue={5.0} onChange={handleTouch} /><br />
              <TextField id="outlined-search" label="Touch Pan Zoom" type="number" variant="outlined" defaultValue={10.0} onChange={handleTouchZoomPan} />
              </div> */}

                     {/* <Divider /> */}
                     <NestedList />
                     {/* <Guide /> */}
                     {getLangTranscript && <MainMenu toggleDrawerAction={mobCloseDrawer} />}

                  </Drawer>
               </Hidden>
               {/* mobile end */}
            </div>

         </div>
         {/* <Hidden only={['lg','xl']}>    
    <FooterControlMob/>
    </Hidden> */}
      </>
   );

}

export default App;