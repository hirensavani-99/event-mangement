import React, {
    useState
} from "react";



//creating context
const EventContext = React.createContext({

    form1Data: (data) => { },
    form2Data: (data) => { },
    form3Data: (data) => { },
    eventData: () => { },
    Data: {}
});

export const EventDataProvider = (props) => {

    const [form1, setForm1] = useState({})
    const [form2, setForm2] = useState({})
    const [form3, setForm3] = useState({})
    const [data1, setData] = useState({})



    const form1Data = (data) => {
      
        setData({ ...data, ...data1 })



    }

    const form2Data = (data) => {
     
        setData({ ...data, ...data1 })


    }

    const form3Data = (data) => {

        setData({...data, ...data1 })

    }

    const eventData = () => {

        return data1


    }

    const contextValue = {
        form1Data: form1Data,
        form2Data: form2Data,
        form3Data: form3Data,
        eventData: eventData,
        Data: data1
    }


    return <EventContext.Provider value={contextValue}>
        {props.children}
    </EventContext.Provider>
}


export default EventContext;