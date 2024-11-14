// import { db } from "../../../lib/firebaseConfig";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import Word from "../../../models/WordsModel/WordsModel";
// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//         const wordsArray = [
//             "太", "充", "電", "雨", "過", "後", "為", "冬", "土", "草", "冒", "哭", "心",
//             "顏", "色", "細", "著", "問", "鳥", "綠", "看", "藍", "空", "媽", "彩", "中", "虹",
//             "音", "樂", "會", "坡", "忙", "布", "場", "入", "口", "河", "林", "間", "風", "跑",
//             "書", "打", "跳", "陪", "去", "險", "海", "找", "歡", "神", "奇", "猜", "次", "誰", "跟",
//             "喜", "帶", "氣", "球", "始", "吹", "突", "然", "得", "高", "樹", "給", "可", "理", "只",
//             "居", "孩", "常", "躲", "發", "現", "就", "頭", "回", "想", "但", "怎", "知", "道", "先",
//             "畫", "愛", "送", "寫", "祝", "張", "臉", "感", "謝", "老", "師", "啊", "還", "漂", "亮",
//             "卡", "片", "秋", "採", "果", "吃", "飽", "方", "埋", "進", "很", "久", "嗎", "長", "敬",
//             "奶", "貝", "早", "校", "園", "工", "作", "她", "邊", "汗", "學", "您", "樣", "當", "成",
//             "井", "隻", "除", "睡", "覺", "東", "西", "拍", "肚", "唉", "幾", "世", "界", "連", "裝",
//             "星", "面", "許", "池", "圈", "波", "紋", "見", "快", "告", "訴", "光", "拉", "怪", "呀"
//           ];

//       const wordsArr = [];

//       for (let i = 0; i < wordsArray.length; i++) {
//         const wordCollection = collection(db, "words");

//           // Check if the document already exists
//           const q = query(
//             wordCollection,
//             where("name", "==", wordsArray[i])
//           );
//           const querySnapshot = await getDocs(q);

//           // If the document exists, skip creation
//           if (!querySnapshot.empty) {
//             console.log(
//               `Document already exists`
//             );
//             continue;
//           }

//           // Prepare new semester data
//           const newWord = {
//             name: wordsArray[i],
//             grade:"NuFsb07opZtE6B6tpHY9",
//             curriculum:"kD9EBxwuoe3a9yWRKm7d",
//             wordType:"Q42TlBt4cvPrEXc9u7Nk",
//             semester:"ImY61ktMYpPw60PlUYMk",
//             createdAt: serverTimestamp(),
//             updatedAt: serverTimestamp(),
//           };

//           // Add new document
//           const addedWord = await addDoc(wordCollection, newWord);
//           wordsArr.push(addedWord.id);
//         }

//       res.status(201).json({
//         message: "Word created successfully",
//         data: wordsArr,
//       });
//     } catch (err) {
//       console.error("Error creating words:", err);
//       res.status(500).json({ error: err.message });
//     }
//   } else {
//     res.setHeader("Allow", "POST");
//     res.status(405).end("Method Not Allowed");
//   }
// }
import { db } from "../../../lib/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  addDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { traditionalWords } from "../../../data/wordData";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

//   try {
//     // Array of words to be added
//     const wordsArray = [
//         "慶", "懷", "祥", "儀", "序", "毫", "挨", "吉", "潮", "炸", "旺", "爆", "梭", "徵", "依",
//         "驗", "拳", "谷", "扮", "勢", "芳", "則", "搭", "配", "達", "製", "效", "兵", "優", "需",
//         "甩", "褲", "童", "識", "族", "尤", "勵", "飾", "較", "甚", "顧", "慮", "肯", "邀", "豪",
//         "蛹", "蟻", "移", "蛻", "煉", "絕", "曉", "殼", "奮", "晾", "翩",
//         "健", "肢", "激", "蹦", "父", "扎", "渴", "弓", "異", "豚", "嘆", "執", "限", "蹟",
//         "烈", "通", "付", "關", "糊", "坦", "危", "吊", "壯", "膽", "腿", "軟", "扛", "晰", "懼",
//         "瓣", "絹", "束", "莖", "政", "議", "致", "橙", "昏", "凋", "憂", "雅", "茶", "跪", "誠",
//         "吵", "歲", "慰", "制", "必", "須", "業", "煤", "養", "替", "疼", "箱", "撒", "嬌", "善",
//         "泊", "拔", "澈", "湛", "夢", "幻", "登", "踏", "填", "喚", "曲", "折", "浹", "喘", "隔",
//         "慧", "燃", "誕", "啟", "境", "考", "材", "攜", "聯", "絡", "彼", "網", "計", "鍵",
//         "譜", "欄", "煎", "廚", "尋", "靈", "縮", "組", "匠", "蔭", "悠", "構", "集", "改",
//         "巫", "衰", "判", "旱", "導", "災", "疊", "陷", "弱", "端", "魂", "聚", "順", "寧", "詳"
//       ]
      
      

//     // Parameters
//     const wordTypeIds = ["Q42TlBt4cvPrEXc9u7Nk", "907D0C34ChEIp550SrfD"];
//     const gradeId = "omafoGnDaiSCKXZaTgKO";
//     const curriculumId = "kD9EBxwuoe3a9yWRKm7d";
//     const wordTypeId = "Q42TlBt4cvPrEXc9u7Nk";
//     const semesterId = "ImY61ktMYpPw60PlUYMk";

//     const wordCollection = collection(db, "words");

//     // Step 2: Add new words
//     const wordsArr = [];
//     // Fetch the lookup data
//     const getLookUp = await getDocs(query(collection(db, "lookup")));

//     // Map the data and include the document ID
//     const lookUpData = getLookUp.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id, // Include the document ID here
//     }));

//     // Find the matching documents by their IDs
//     const grade = lookUpData.find((data) => data.id === gradeId)?.name;
//     const curriculum = lookUpData.find(
//       (data) => data.id === curriculumId
//     )?.name;
//     const wordType = lookUpData.find((data) => data.id === wordTypeId)?.name;
//     const semeser = lookUpData.find((data) => data.id === semesterId)?.name;

//     // Optional: Check if any of the values are undefined and handle errors
//     if (!grade || !curriculum || !wordType) {
//       throw new Error("One or more lookup values not found");
//     }
//     for (let i = 0; i < wordsArray.length; i++) {
//       // Check if the word already exists (just to be extra safe)
//       const checkQuery = query(
//         wordCollection,
//         where("name", "==", wordsArray[i]),
//         where("semester", "==", semesterId),
//         where("grade", "==", gradeId),
//         where("curriculum", "==", curriculumId),
//         where("wordType", "==", wordTypeId)
//       );
//       const checkSnapshot = await getDocs(checkQuery);

//       if (!checkSnapshot.empty) {
//         console.log(`Word "${wordsArray[i]}" already exists, skipping.`);
//         continue;
//       }

//       // Prepare new word data
//       const newWord = {
//         name: wordsArray[i],
//         grade: gradeId,
//         curriculum: curriculumId,
//         wordType: wordTypeId,
//         semester: semesterId,
//         createdAt: serverTimestamp(),
//         updatedAt: serverTimestamp(),
//       };

//       // Add the new word to Firestore
//       const addedWord = await addDoc(wordCollection, newWord);
//       wordsArr.push({
//         id: addedWord.id,
//         name: wordsArray[i],
//         grade,
//         curriculum,
//         wordType,
//         semeser,
//       });
//     }

//     res.status(201).json({
//       message: "Words created successfully",
//       data: wordsArr,
//     });
//   } catch (err) {
//     console.error("Error creating words:", err);
//     res.status(500).json({ error: err.message });
//   }

const wordCollection = collection(db, "words");

// Iterate through the curriculum, grade, semester, and wordType
for (const grade in traditionalWords) {
    for (const semester in traditionalWords[grade]) {
      for (const wordType in traditionalWords[grade][semester]) {
        const words = traditionalWords[grade][semester][wordType];
        console.log(words)
        // Upload each word to Firebase
        for (const word of words) {
          try {
            // Check if the word already exists
            const q = query(
              wordCollection,
              where("name", "==", word),
              where("curriculum", "==", "un0NKNdriXofFOpiXsSx"),
              where("grade", "==", grade),
              where("semester", "==", semester),
              where("wordType", "==", wordType)
            );
            const querySnapshot = await getDocs(q);

            // If the document does not exist, add it
            if (querySnapshot.empty) {
              const newWord = {
                name: word,
                curriculum: "Kangxuan",
                grade: grade,
                semester: semester,
                wordType: wordType,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
              };
              await addDoc(wordCollection, newWord);
              console.log(`Added word: ${word}`);
            } else {
              console.log(`Word "${word}" already exists`);
            }
          } catch (err) {
            console.error("Error adding word:", err);
          }
        }
      }
    }
  }
  res.json({ message: "Words added successfully" });
}

// export default async function handler(req, res) {
//     if (req.method !== "POST") {
//       res.setHeader("Allow", "POST");
//       return res.status(405).end("Method Not Allowed");
//     }

//     try {
//       // Array of words to be added
//       const wordsArray = [
//         "擠", "跌", "騎", "圖", "館", "灘", "塑", "撞", "瘦", "嚇", "燙", "蹺", "糯", "變", "盤"
//       ];

//      const gradeIds=["RILMJWhuTuauLi83Fw64","omafoGnDaiSCKXZaTgKO","wVaz3D0hC4HcbMzwYQPG","CRDWECgrXPkDzkGh8CCl"]

//      const semesterIds=["YhimHVA4W0bNP400EVq7","ImY61ktMYpPw60PlUYMk"]
//      const wordTypeIds=["Q42TlBt4cvPrEXc9u7Nk","907D0C34ChEIp550SrfD"]

//       // Parameters
//     //   const gradeId = "OBlWSwTIcr9VuUNAoVe9";
//     //   const curriculumId = "kD9EBxwuoe3a9yWRKm7d";
//     //   const wordTypeId = "907D0C34ChEIp550SrfD";
//     //   const semesterId = "YhimHVA4W0bNP400EVq7";

//       const wordCollection = collection(db, "words");

//       // Step 2: Add new words
//       const wordsArr = [];
//       // Fetch the lookup data
//       const getLookUp = await getDocs(query(collection(db, "lookup")));

//       // Map the data and include the document ID
//       const lookUpData = getLookUp.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id, // Include the document ID here
//       }));

//       for(let i=0;i<gradeIds.length;i++){
//         for(let j=0;j<semesterIds.length;j++){
//             for(let k=0;wordTypeIds.length;k++){

//             }
//         }

//       }

//       // Find the matching documents by their IDs
//       const grade = lookUpData.find((data) => data.id === gradeId)?.name;
//       const curriculum = lookUpData.find(
//         (data) => data.id === curriculumId
//       )?.name;
//       const wordType = lookUpData.find((data) => data.id === wordTypeId)?.name;
//       const semeser = lookUpData.find((data) => data.id === semesterId)?.name;

//       // Optional: Check if any of the values are undefined and handle errors
//       if (!grade || !curriculum || !wordType) {
//         throw new Error("One or more lookup values not found");
//       }
//       for (let i = 0; i < wordsArray.length; i++) {
//         // Check if the word already exists (just to be extra safe)
//         const checkQuery = query(
//           wordCollection,
//           where("name", "==", wordsArray[i]),
//           where("semester", "==", semesterId),
//           where("grade", "==", gradeId),
//           where("curriculum", "==", curriculumId),
//           where("wordType", "==", wordTypeId)
//         );
//         const checkSnapshot = await getDocs(checkQuery);

//         if (!checkSnapshot.empty) {
//           console.log(`Word "${wordsArray[i]}" already exists, skipping.`);
//           continue;
//         }

//         // Prepare new word data
//         const newWord = {
//           name: wordsArray[i],
//           grade: gradeId,
//           curriculum: curriculumId,
//           wordType: wordTypeId,
//           semester: semesterId,
//           createdAt: serverTimestamp(),
//           updatedAt: serverTimestamp(),
//         };

//         // Add the new word to Firestore
//         const addedWord = await addDoc(wordCollection, newWord);
//         wordsArr.push({
//           id: addedWord.id,
//           name: wordsArray[i],
//           grade,
//           curriculum,
//           wordType,
//           semeser
//         });
//       }

//       res.status(201).json({
//         message: "Words created successfully",
//         data: wordsArr,
//       });
//     } catch (err) {
//       console.error("Error creating words:", err);
//       res.status(500).json({ error: err.message });
//     }
//   }
