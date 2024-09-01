import { Box, Button, FormControl, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useMain } from "../../contexts/MainContext"
import Logo from '../../assets/full-logo.png';
import ChannelDropdown, { FIRST_OPTION_VALUE_DROPDOWN } from "../../components/ChannelDropdown";
import { getAllListChannel } from "../../api/appScore";
import { ConstructionOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
    const { setUser, setChannel, joinGame } = useMain()
    const navigate = useNavigate()
    // TO DO: Create State.
    // Create state for contain name that user type
    const [name, setName] = useState<string>("John doe")
    // Create state for contain channel that user select (string)
    const [channelName, setChannelName] = useState<string>(FIRST_OPTION_VALUE_DROPDOWN)
    // Create state for contain channel list (string[])
    const [appNameLists, setAppNameLists] = useState<string[]>([])
    // Create state for contain new chanel that user type in textfield (string)
    const [newChannelName, setNewChannelName] = useState<string>("")

    useEffect(() => {
        // TO DO.

        // When page is rendered.
        // Call getAllListChannel() for get all channel list.
        // And save those to state
        const GetAllListChannel = async () => {
            try {
                const data = await getAllListChannel()
                console.log(data)
                setAppNameLists(() => [...data])
            } catch (error) {
                console.error(error)
                alert('error na')
            }
        }

        GetAllListChannel()

    }, [])

    useEffect(() => {
        console.log("new channel name: ", newChannelName)
    }, [newChannelName])


    const onStartBtnClick = () => {
        // TO DO.

        // Logic for when user click on start button
        // if channel name is not null and is not "Select..."
        // set name to User state (from global state [context])
        // Call joinGame(channelName) for join channel game
        // set channel name  to Channel state (from global state [context])
        // finally, navigate to game page

        // if channel name is null or is "Select..."
        // Alert warning message.
        if (channelName && channelName != FIRST_OPTION_VALUE_DROPDOWN && name && name.trim() !== "") {
            setUser(name)
            joinGame(channelName)
            setChannel(channelName)

            navigate('/game')
        } else {
            alert("เลือกห้องด้วยนะ!!!!! :-(")
        }
    }

    return (
        <Box>
            <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Box component="img" sx={{
                        // height: 108
                    }} src={Logo}></Box>
                </Grid>
                <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} p={2} justifyContent="center">
                    <Typography variant="h2" p={1}>
                        Select Channel
                    </Typography>

                    {/*TO DO: Create dropdown for show channel list */}
                    <ChannelDropdown
                        appNameLists={appNameLists}
                        channelName={channelName}
                        onChange={(val: string) => {
                            console.log("val: ", val)
                            setChannelName(val)
                        }}
                    />
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        {/* Create textfield for input channel name that need to create new. */}
                        <TextField
                            label="Create new channel"
                            onChange={(e) => { setNewChannelName(e.target.value) }}
                        />
                    </FormControl>
                    <Grid item xs={12} sm={6}>
                        {/* TO DO: Create button for create new channel */}
                        <Button
                            variant="outlined"
                            sx={{ mt: 1 }}
                            onClick={() => {
                                alert(`click to create ${newChannelName}`)
                                if (newChannelName.trim() !== "") {
                                    setAppNameLists(p => {
                                        if (p.includes(newChannelName)) {
                                            return p
                                        } else {
                                            return [newChannelName, ...p]
                                        }
                                    })
                                    setChannelName(newChannelName)
                                } else {
                                    alert("กรุณาใส่ชื่อห้องด้วย")
                                }
                            }}
                        >
                            Create new room
                        </Button>
                    </Grid>

                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} p={2}>
                    <FormControl fullWidth sx={{ mt: 1 }}>
                        {/* TO DO: Create textfield for inpurt player name */}
                        <TextField
                            label="Player name"
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            value={name}
                            required
                        />
                    </FormControl>
                </Grid>
                <Grid container item xs={12} pt={1} p={2} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        {/* TO DO: Create button for play game */}
                        <Button
                            variant="contained"
                            onClick={onStartBtnClick}
                        >
                            Play
                        </Button>
                    </Grid>

                </Grid>
            </Grid>
        </Box>
    )
}

export default StartPage