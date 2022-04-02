import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { shallow } from 'enzyme';

test('Find link', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const linkElement = screen.getByText('Add Product');
    expect(linkElement).toBeInTheDocument();
});

it('Find Dashboard', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
});

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([{
            avatar: "",
            category: "electronics",
            description: "of leeb sites still in their infancy",
            id: "17",
            name: "Apple MacBook",
            price: "1999"
        }]),
    })
);

let wrapper;
beforeEach(() => {
    fetch.mockClear();
    wrapper = shallow(<App></App>);
});

it("Check correct length", async () => {

    const comp = wrapper.instance();
    const actual = await comp.getProductsFromResource([{
        avatar: "",
        category: "electronics",
        description: "of leeb sites still in their infancy",
        id: "17",
        name: "Apple MacBook",
        price: "1999"
    }], "electronics");

    expect(actual).toHaveLength(1);
    //expect(fetch).toHaveBeenCalledTimes(1);
});


 
