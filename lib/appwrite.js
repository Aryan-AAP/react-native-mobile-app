import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aap.aora",
  projectId: "667682e40028faf23753",
  databaseId: "6676842c00385095573d",
  userCollectionId: "66768454001c1cc51a0a",
  videoCOllectionId: "667684a4000fa4eb19ad",
  storageId: "6676873600093f2ca257",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCOllectionId,
  storageId

}=config


const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error.error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error.error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};




export const getAllPosts=async ()=>{

  try {
    const post =await databases.listDocuments(
      databaseId,
      videoCOllectionId,


    )
    return post.documents;

  } catch (error) {
    throw new Error.error
    
  }
}


export const searchPost=async (query)=>{

  try {
    const post =await databases.lisquerytDocuments(
      databaseId,
      videoCOllectionId,
[Query.search['title',query]]

    )
    return post.documents;

  } catch (error) {
    throw new Error.error
    
  }
}


export const getLatestPosts=async ()=>{

  try {
    const post =await databases.listDocuments(
      databaseId,
      videoCOllectionId,
[Query.orderDesc['$createdAt',Query.limit(7)]]

    )
    return post.documents;

  } catch (error) {
    throw new Error.error
    
  }
}

