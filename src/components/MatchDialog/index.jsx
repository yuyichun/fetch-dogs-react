import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";

const MatchDialog = ({ open, matchResult, onClose }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>🎉 Congrats! You have a match! 🎉</DialogTitle>
        <DialogContent>
            {matchResult && (
                <div style={{ textAlign: "center" }}>
                    <img src={matchResult.img} alt={matchResult.name} style={{ width: "150px", borderRadius: "10px" }} />
                    <p>Name: {matchResult.name}</p>
                    <p>Breed: {matchResult.breed}</p>
                    <p>Age: {matchResult.age}</p>
                    <p>Location: {matchResult.zip_code}</p>
                    <Button variant="contained" onClick={onClose} style={{ marginTop: "20px" }}>
                        Close
                    </Button>
                </div>
            )}
        </DialogContent>
    </Dialog>
);

export default MatchDialog;
