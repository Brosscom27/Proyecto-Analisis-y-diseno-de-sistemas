import mongoose from "mongoose";

export default class DB {

    static async connectDB(DB_URI) {  //static: El metodo puedo ser llamado sin encesidad de instancias una clase
        try {
            mongoose.connect(DB_URI);
        } catch (err) {
            console.error(err.message);
            process.exit(1);
        }
        const dbConnection = mongoose.connection;  //Si no hubo error en la coenxión
        dbConnection.once("open", (_) => {  //Este evento se dispara una sola vez cuando la conexión con la base de datos se establece por primera vez. Si lo abre, envía el callback
            console.log(`Database connected: ${DB_URI}`);
        });

        dbConnection.on("error", (err) => { //Este evento se llama siempre que haya un error con la conexión. Se utiliza on para escuchar todos los eventos de error que puedan ocurrir después de establecer la conexión
            console.error(`connection error: ${err}`);
        });
        return;
    }


}