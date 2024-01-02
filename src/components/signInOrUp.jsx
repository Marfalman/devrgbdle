import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { Modal } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { SignInModal } from "./signInModal";
import { SignUpModal } from "./signUpModal";

export function SignInOrUp(props){
    const [tabValue, setTabValue] = useState("signIn");
    const [close, setClose] = useState(false);

    const handleChange = (event, newTab) =>{
      setTabValue(newTab);
    }

    useEffect(() => {
        if(close){
            handleClose();
        }
        if(!props.open){
            setClose(false)
        }
    }, [close, props.open])

    const handleClose = () => props.passShowSignIn(false);
    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2
      };
    return (
        <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
        <TabContext value={tabValue}>
        <Box
          sx={style}
        > <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="sign in & sign up tabs">
            <Tab label="Sign in" value="signIn" />
            <Tab label="Sign up" value="signUp" />
          </TabList>
          </Box>
          <TabPanel value = "signIn">
            <SignInModal close = {setClose}></SignInModal>
          </TabPanel>
          <TabPanel value = "signUp">
            <SignUpModal close = {setClose}></SignUpModal>
          </TabPanel>
        </Box>
        </TabContext>
        </div>
      </Modal>
    )
}