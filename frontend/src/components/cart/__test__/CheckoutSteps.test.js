import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import CheckoutSteps from '../CheckoutSteps'
import { BrowserRouter as Router, Route} from 'react-router-dom'

it('shoud disable title confirmOrder, payment', async () => {
    render(<Router> <CheckoutSteps  shipping/> </Router>);
    const headingElement = screen.getByText(/confirm Order/i).closest('a');
    expect(headingElement).toHaveAttribute('href', '/#!');

    expect(screen.getByText(/payment/i).closest('a')).toHaveAttribute('href', '/#!')
});
it('shoud disable title payment', async () => {
    render(<Router> <CheckoutSteps  shipping confirmOrder/> </Router>);
    const headingElement = screen.getByText(/payment/i).closest('a');
    expect(headingElement).toHaveAttribute('href', '/#!');
});