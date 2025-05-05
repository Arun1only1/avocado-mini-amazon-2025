import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

const CartAmount = () => {
  return (
    <Box className="w-1/3 mt-12 flex flex-col justify-center items-center">
      <Typography className="font-bold text-xl">Checkout Summary</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-base">
                Sub total
              </TableCell>
              <TableCell className="font-semibold text-base">$3000</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-semibold text-base">
                Discount
              </TableCell>
              <TableCell className="font-semibold text-base">$150</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-semibold text-base">
                Grand Total
              </TableCell>
              <TableCell className="font-semibold text-base">$2850</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button fullWidth variant="contained" color="warning">
        proceed to checkout
      </Button>
    </Box>
  );
};

export default CartAmount;
