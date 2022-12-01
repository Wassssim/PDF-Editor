import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
	const { lang } = useParams();
	const navigate = useNavigate();
    const { i18n } = useTranslation();

    const handleChange = (event: SelectChangeEvent) => {
		navigate(`/${event.target.value as string}`);
		/*i18n.changeLanguage(event.target.value as string)
		.catch(err => console.error(err));*/
    };

	useEffect(() => {
		i18n.changeLanguage(lang);
	}, [lang]);

    return (
		<>
			<div className="NavBar">
				<Select
					id="language-select"
					label="Age"
					value={i18n.language}
					onChange={handleChange}
					variant="standard"
					sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
				>
					<MenuItem value={"en"}>En</MenuItem>
					<MenuItem value={"fr"}>Fr</MenuItem>
				</Select>
			</div>
			<Outlet/>
		</>
    )
}

export default NavBar