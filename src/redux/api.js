import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyAMFawnVGYJ8872DXSq_8hMwc1myVCW0ho'; // Add your API key here

export const generateImageCaptions = createAsyncThunk(
  'captions/generateImageCaptions',
  async ({ imageBase64, description, style }, { rejectWithValue }) => {
    const prompt = `
    Generate 5 professionally written social media captions based on this Description, Style, and image.
    
    Description: "\${description}"
    Style: "\${style}"
    
    Instructions:
    - Each caption must start with an emoji followed by two spaces.
    - Do NOT include any hashtags inside the "caption" field.
    - Please keep focus on descriptions and style based on that provide content
    - Instead, provide all 20 trending and relevant hashtags separately in the "hashtags" array.
    - Ensure the hashtags array contains only plain hashtags (e.g., "#EarthDay"), not inside any sentence.
    - Each object in the array must include a unique "id" field using UUID format (e.g., "8f14e45f-ea9e-4a0a-9d92-0b923920b0c8").
    
    Format the output as a JSON array like this:
    [
      {
        "id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        "caption": "😄  Your caption here with emojis and text only.",
        "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8", "#tag9", "#tag10"]
      }
    ]
    `;
    

    try {      
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: 'image/jpeg',
                    data: imageBase64,
                  },
                },
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('response.data', response.data);
      
      const text = response.data.candidates[0].content.parts[0].text;
      return text;
    } catch (err) {
      console.log('response.err', err);

      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
