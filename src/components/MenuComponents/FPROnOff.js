import React from 'react'
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

const BtnIcon = {
   borderRadius: "0px",
   background: 'transparent',
   width: '36px',
   height: '36px'
}
const Btn = {
   borderRadius: "0px",
   background: 'transparent',
   border: 'none',
   boxShadow: 'none',
   marginLeft: '10px',
   color: '#000',
   textTransform: 'capitalize',
   marginRight: "25px"
}
const FPROnOff = (props) => {

   return (
      <div className="menubtn">
         <Button className="Btnsubmenu"
            style={Btn}
            variant="contained"
            color="secondary"
            startIcon={<Avatar style={BtnIcon} src={props.changeOnOffImg} />}
         ><span aria-hidden='true'> {props.submenu}</span>


         </Button>
         <span id="openCloseLid" style={{ opacity: '0',position: 'absolute' }} role="alert">Open/Close Lid</span>
      </div>
   )
}

export default FPROnOff
