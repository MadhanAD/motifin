import {GlobalColors} from "../../../utility/GlobalColors";
import {GlobalStyle} from "../../../utility/GlobalStyle";

export const styles = {
    rootContainer: {
        height: "100vh",
        backgroundColor: GlobalColors.deepPurple500,
        ...GlobalStyle.noSpace
    },
    listItemContainer: {
        cursor: "pointer"
    }
}
