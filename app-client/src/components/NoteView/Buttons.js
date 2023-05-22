export default function Buttons(props) {
    if (props.viewMode === "Modify") {
        return (
            <>
                <button type="submit" value="submit" id="submit" onClick={props.handleClickModify}>Zatwierdź</button>
                <button type="reset" value="reset" id="reset" onClick={props.handleClickDelete}>Usuń</button>
            </>
        )
    } else {
        return (
            <>
                <button type="submit" value="submit" id="submit" onClick={props.handleClickAdd}>Dodaj</button>
            </>
        )
    }
}