export const fetchTujuanData = async () => {
    try {
        const response = await fetch('http://localhost:1034/tujuan/read', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.error);
        }
        
        return result.data; // Return hanya array data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const addTujuanData = async (tujuanData) => {
    try {
        const formatedSekitar = tujuanData.sekitar.join(',')
        const formatedDataSekitar = {
            ...tujuanData,
            sekitar: formatedSekitar
        }
        const response = await fetch('http://localhost:1034/tujuan/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formatedDataSekitar)
        });
        console.log('respon yang akan dikirim:', response);
        
        return await response.json();
    } catch (error) {
        console.error('Error adding data:', error);
        throw error;
    }
}

export const updateTujuanData = async (tujuanData) => {
    try {
        const formatedSekitar = tujuanData.sekitar.join(',')
        const formatedDataSekitar = {
            ...tujuanData,
            jarak: String(tujuanData.jarak),
            harga: String(tujuanData.harga),
            sekitar: formatedSekitar
        }
        const response = await fetch(`http://localhost:1034/tujuan/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(formatedDataSekitar)
        });
        console.log('respon yang akan dikirim:', response);
        
        return await response.json();
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

export const deleteTujuanData = async (id) => {
    try {
        const response = await fetch(`http://localhost:1034/tujuan/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}