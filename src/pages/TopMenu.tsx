import { useState, useEffect } from 'react';
import Header from './Header';
import Collation from './Collation';
import Inspection from './Inspection';
import Login from './Login'
import StorageSearch from './StorageSearch';
import StorageRegister from './StorageRegister';
import Test from './Test';
import { Container } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DifferenceIcon from '@mui/icons-material/Difference';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import GetAppIcon from '@mui/icons-material/GetApp';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import SearchIcon from '@mui/icons-material/Search';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { MenuButton } from '../components/MenuButton';
import { BottomButton } from '../components/BottomButton';
import { UserName } from '../components/UserName';
import CustomDialog from '../components/CustomDialog';

function TopMenu(){
    const [ menu, setMenu ] = useState(0);
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userName, setUserName ] = useState("");
    const [ open, setOpen ] = useState(false);

    const token = localStorage.getItem("authToken");
    useEffect(() => {
        if(token !== null){
            setLoggedIn(true)
        }
    }, [token]);

    const userNameStored = localStorage.getItem("userName");
    useEffect(() => {
        if(userNameStored !== null){
            setUserName(userNameStored)
        }
    }, [userNameStored]);

    function Logout() {
        setLoggedIn(false);
        setUserName("");
        localStorage.removeItem("authToken")
        localStorage.removeItem("userName")
    }

    return (
        <>
        <Header />
        { menu === 0 && !loggedIn &&
        <>
        <Container component = "main" maxWidth = "xs" sx ={{marginTop: 2}}>
            <MenuButton icon = {<SearchIcon />} onClick = {() => setMenu(6)}>????????????</MenuButton>
        </Container>
        <BottomButton icon = {<LoginIcon />}onClick = {() => setMenu(10)}>????????????</BottomButton>
        </>
        }

        { menu === 0 &&
        loggedIn &&
        <>
        <UserName>{userName}</UserName>
        <Container component = "main" maxWidth = "xs">
            <MenuButton icon = {<ContentCopyIcon />} onClick = {() => setMenu(1)}>??????(?????????????????????????????????)</MenuButton>
            <MenuButton icon = {<DifferenceIcon />} onClick = {() => setMenu(2)}>??????(?????????????????????????????????)</MenuButton>
            <MenuButton icon = {<CompareArrowsIcon />} onClick = {() => setMenu(3)}>??????(?????????????????????????????????)</MenuButton>
            <MenuButton icon = {<GetAppIcon />} onClick = {() => setMenu(4)}>????????????</MenuButton>
            <MenuButton icon = {<WarehouseIcon />} onClick = {() => setMenu(5)}>????????????</MenuButton>
            <MenuButton icon = {<SearchIcon />} onClick = {() => setMenu(6)}>????????????</MenuButton>
            <MenuButton icon = {<AssignmentTurnedInIcon />} onClick = {() => setMenu(7)}>??????</MenuButton>
        </Container>
        <BottomButton icon = {<LogoutIcon />}onClick = {() => setOpen(true)}>???????????????</BottomButton>
        </>
        }
        <CustomDialog
            title = "???????????????????????????"
            buttonText = "?????????"
            flagOnClose
            onClick = {() => {
                Logout();
                setOpen(false);
            }}
            open = {open}
        />
        {/* ???????????? */}
        { menu === 10 &&
        <div>
            <Login menu = {menu} loggedIn = {loggedIn} userName = {userName}
            setMenu = {setMenu} setLoggedIn = {setLoggedIn} setUserName = {setUserName}/>
        </div>
        }
        {/* ?????? */}
        { (menu === 1 || menu === 2 || menu === 3) &&
        <div>
            <Collation menu = {menu} userName = {userName} setMenu = {setMenu}/>
        </div>
        }
        {/* ???????????? */}
        { menu === 4 &&
        <div>
            <Inspection menu = {menu} userName = {userName} setMenu = {setMenu}/>
        </div>
        }
        {/* ???????????? */}
        { menu === 5 &&
        <div>
            <StorageRegister menu = {menu} userName = {userName} setMenu = {setMenu}/>
        </div>
        }
        {/* ???????????? */}
        { menu === 6 &&
        <div>
            <StorageSearch menu = {menu} userName = {userName} setMenu = {setMenu}/>
        </div>
        }
        {/* ?????? */}
        { menu === 7 &&
        <div>
            <Test menu = {menu} userName = {userName} setMenu = {setMenu}/>
        </div>
        }
        </>
    );
}

export default TopMenu;