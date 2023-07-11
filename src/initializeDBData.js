
const initializeDBData = () => {
    const dbRef = doc(db, 'cameras', 'pentax_me_super')
    setDoc(dbRef, {
    "film_rolls": [
        {
        "film": 'fujifilm_400_colour',
        'lens': '50mm',
        'id': generateId(),
        'date_created': new Date(),
        'photos': [
            {
            'subject': 'Maddy & Frank',
            'id': generateId(),
            'exposure_comp': '1x',
            'f_stop': 2,
            'shutter_speed': '1/2000s'
            },
            {
            'subject': 'Plant',
            'id': generateId(),
            'exposure_comp': '1/4x',
            'f_stop': 11,
            'shutter_speed': '1/500s'
            },
        ]
        },
        {
        "film": 'fujifilm_200_colour',
        'lens': '50mm',
        'id': generateId(),
        'date_created': new Date(),
        'photos': [
            {
            'subject': 'Fence',
            'id': generateId(),
            'exposure_comp': '1x',
            'f_stop': 2,
            'shutter_speed': '1/2000s'
            },
            {
            'subject': 'Waterslides @ Henderson',
            'id': generateId(),
            'exposure_comp': '2x',
            'f_stop': 2,
            'shutter_speed': '1/100s'
            },
        ]
        },
        {
        "film": 'ilford_hp5_400',
        'lens': '50mm',
        'id': generateId(),        
        'date_created': new Date(),
        'photos': [
            {
            'subject': 'Maddy & Asher',
            'id': generateId(),
            'exposure_comp': '1/4x',
            'f_stop': 22,
            'shutter_speed': '1/250'
            },
            {
            'subject': 'Bridge @ Henderson',
            'id': generateId(),
            'exposure_comp': '1x',
            'f_stop': 11,
            'shutter_speed': '1/100s'
            },
        ]
        },
    
    ]
    })
}

export default initializeDBData;