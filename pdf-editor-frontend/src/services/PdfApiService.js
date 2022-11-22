import axios from 'axios';

const API_URL = 'http://localhost:3000/api/pdf';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default class PdfApiService {
    async uploadPdf(file, onUploadProgress) {
        const formData = new FormData();
        formData.append('pdf_file', file);
        const response = await axiosInstance.post(`${API_URL}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress
        });
        return response.data;
    }

    async getPdf() {
        return await axiosInstance.get(API_URL);
    }
}
