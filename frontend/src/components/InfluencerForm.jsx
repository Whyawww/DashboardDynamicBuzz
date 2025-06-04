import React, { useState } from "react";
import { getPrediction } from "../services/api";
import ResultDisplay from "./ResultDisplay";

const InfluencerForm = () => {
  const [formData, setFormData] = useState({
    followers: "",
    posts: "",
    likes: "",
    category: "entertainment",
    channel_Info: "female",
  });

  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("loading");
    setResult(null);
    setError(null);

    try {
      const payload = {
        "Followers": Number(formData.followers),
        "Posts": Number(formData.posts),
        "Avg. Likes": Number(formData.likes),
        "Category": formData.category,
        "channel_Info": formData.channel_Info,
      };

      const predictionResult = await getPrediction(payload);
      
      setResult(predictionResult);
      setStatus("success");
      } catch (err) {
          setError(err.message); 
          setStatus("error");
      }
  };

  const isDisabled =
    !formData.followers ||
    !formData.posts ||
    !formData.likes ||
    status === "loading";

  return (
    <div className="w-full max-w-xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Input Fields (Followers, Posts, Avg. Likes) */}
        <div>
          <label htmlFor="followers" className="block text-sm font-medium text-gray-700">
            Followers
          </label>
          <input
            id="followers"
            type="number"
            name="followers"
            value={formData.followers}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
            placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="0"
            placeholder="e.g., 500000"
          />
        </div>

        <div>
          <label htmlFor="posts" className="block text-sm font-medium text-gray-700">
            Posts
          </label>
          <input
            id="posts"
            type="number"
            name="posts"
            value={formData.posts}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none 
            focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="0"
            placeholder="e.g., 1500"
          />
        </div>

        <div>
          <label htmlFor="likes" className="block text-sm font-medium text-gray-700">
            Average Likes
          </label>
          <input
            id="likes"
            type="number"
            name="likes"
            value={formData.likes}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            min="0"
            placeholder="e.g., 25000"
          />
        </div>

        {/* Select Fields (Category, Channel Info) */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none 
            focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="entertainment">Entertainment</option>
            <option value="fashion">Fashion</option>
            <option value="health">Health, Sports & Fitness</option>
            <option value="beauty">Beauty & Makeup</option>
            <option value="news">News & Politics</option>
            <option value="photography">photography</option>
            <option value="technology">Technology</option>
            <option value="food">Food</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Finance">Finance</option>
            <option value="craft">Craft/DIY</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="channel_Info" className="block text-sm font-medium text-gray-700">
            Channel Info
          </label>
          <select
            id="channel_Info"
            name="channel_Info"
            value={formData.channel_Info}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none 
            focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="brand">Brand</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm 
            font-medium text-yellow-400 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-indigo-500 transition-opacity ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {status === "loading" ? "Analyzing..." : "Analyze Influencer"}
        </button>
      </form>

      {/* Result Display Area */}
      <div className="mt-8">
        <ResultDisplay status={status} result={result} error={error} />
      </div>
    </div>
  );
};

export default InfluencerForm;


