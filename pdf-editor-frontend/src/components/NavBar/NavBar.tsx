import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { useTranslation } from "react-i18next";
import './NavBar.css';

function NavBar() {
    const { i18n } = useTranslation();

    const handleChange = (event: SelectChangeEvent) => {
			i18n.changeLanguage(event.target.value as string)
			.catch(err => console.error(err));
    };
    return (
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
    )
}

export default NavBar