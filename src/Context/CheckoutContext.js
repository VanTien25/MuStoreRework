import { useState, createContext } from "react";

const CheckoutContext = createContext()

function CheckoutProvider({ children }) {
    const [checkout, setCheckout] = useState({})
    const [address, setAddress] = useState({})
    const [voucher, setVoucher] = useState({})

    return (
        <CheckoutContext.Provider value={{checkout, setCheckout, address, setAddress, voucher, setVoucher}}>
            {children}
        </CheckoutContext.Provider>
    )
}

export { CheckoutContext, CheckoutProvider }    