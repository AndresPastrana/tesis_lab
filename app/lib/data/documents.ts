// Functios to interact with the doduments collection

// import AcademicDocModel from "../models/Document";

// //fetch docs
// const fetchDocs = async ({ query }: { query: string }) => {
//   try {
//     const fields = Object.keys(AcademicDocModel.schema.paths);

//     const regexConditions = fields.map((field) => {
//       if (Array.isArray(AcademicDocModel.schema.paths[field].instance)) {
//         // If the field is an array of strings, use $elemMatch to check if any element matches the regex
//         return {
//           [field]: {
//             $elemMatch: { $regex: query, $options: "i" },
//           },
//         };
//       } else {
//         // For non-array fields, perform a regular expression search
//         return {
//           [field]: { $regex: query, $options: "i" },
//         };
//       }
//     });

//     const results = await AcademicDocModel.find({
//       $or: regexConditions,
//     });

//     return results;
//   } catch (error) {
//     // Handle the error appropriately (logging, rethrowing, etc.)
//     console.error("Error searching documents:", error);
//     throw error;
//   }
// };

// create a new document
