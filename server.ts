import app from './app';

const PORT: number = Number(process.env.PORT) || 8080;
const HOST: string = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Server is running on ${HOST}:${PORT}`);
});
