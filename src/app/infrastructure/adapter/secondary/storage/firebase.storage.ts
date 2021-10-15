import FirebaseStorageInterface from "../../../../domain/port/secondary/storage/firebase-storage.interface";

import firebase from '@react-native-firebase/app';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';

export default class FirebaseStorage implements FirebaseStorageInterface {
    public static storage = storage();

    public async uploadFile(ref: string, name: string, path: string) {
        console.log("\n\n\n\n\n\n Got in upload file");
        return new Promise<string | undefined>(
            (resolve, reject) => {
                this.uploadToFirebase(ref, name, path)
                    .then(
                        (snap) => {
                            console.log("\nGot task");
                            console.log(snap);
                            if (snap != undefined) {
                                console.log(snap);

                                const reference = FirebaseStorage.storage.ref(ref + '/' + name);
                                reference.getDownloadURL()
                                    .then(
                                        (url) => {
                                            console.log(url);
                                            resolve(url);
                                        }
                                    )
                            }
                        }
                    ).catch(
                        (error) => {
                            console.error(error)
                        }
                    )
            }
        )

    }

    private uploadToFirebase(ref: string, name: string, path: any) {
        const reference = FirebaseStorage.storage.ref(ref);

        return new Promise<FirebaseStorageTypes.TaskSnapshot | undefined>((resolve, reject) => {
            reference.child(name).putFile(
                path,
                {
                    cacheControl: 'no-store'
                }
            ).then((snapshot) => {
                console.log("\n\n\n\n\n\n Got in upload ro firebase\n\n\n");
                console.log(snapshot.ref);
                resolve(snapshot);
            }).catch((error) => {
                reject(error);
            });

        });

    }

}