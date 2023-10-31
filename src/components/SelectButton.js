import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  selectbutton: {
    border: "1px solid #0086D0",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: (props) => (props.selected ? "#0086D0" : ""), // Use props.selected here
    color: (props) => (props.selected ? "black" : ""), // Use props.selected here
    fontWeight: (props) => (props.selected ? 700 : 500), // Use props.selected here
    "&:hover": {
      backgroundColor: "#7DF9FF",
      color: "black",
    },
    width: "22%",
  },
});

const SelectButton = ({ children, selected, onClick }) => {
  const classes = useStyles({ selected }); // Pass selected as a prop to useStyles

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
