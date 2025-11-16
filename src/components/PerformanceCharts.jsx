import React from "react";
import { useAccessibility } from "../contexts/AccessibilityContext";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PerformanceCharts = ({ stats }) => {
  const { highContrast } = useAccessibility();

  // High-contrast aware chart theming
  const hc = highContrast;
  const axisColor = hc ? "#ffffff" : "#374151"; // white vs gray-700
  const gridColor = hc ? "#444444" : "#e5e7eb"; // dark gray vs gray-200
  const labelColor = hc ? "#ffffff" : "#1f2937"; // white vs gray-800
  const tooltipContentStyle = hc
    ? { backgroundColor: "#ffffff", borderColor: "#ffffff", color: "#000000" }
    : {};
  const tooltipLabelStyle = hc ? { color: "#000000" } : undefined;
  const tooltipItemStyle = hc ? { color: "#000000" } : undefined;
  const legendStyle = hc ? { color: "#ffffff" } : undefined;

  // Series colors: pick brighter hues in HC for strong contrast
  const series = {
    score: hc ? "#ffa500" : "#3b82f6", // orange vs blue-500
    memoryMoves: hc ? "#00bfff" : "#8b5cf6", // cyan vs purple-500
    memoryTime: hc ? "#b2ff59" : "#10b981", // lime vs emerald-500
    quiz: hc ? "#00e5ff" : "#10b981", // bright cyan vs emerald-500
    word: hc ? "#ff4dd2" : "#06b6d4", // magenta vs cyan-500
    math: hc ? "#ffd54f" : "#f97316", // amber vs orange-500
    pattern: hc ? "#ff6ec7" : "#ec4899", // pink-magenta vs pink-500
  };
  if (!stats || stats.totalGames === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600">
          No game data yet. Play some games to see your statistics!
        </p>
      </div>
    );
  }

  // Format date for chart display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // Prepare data for score trend chart (last 10 games)
  const scoreTrendData = stats.scoreHistory.slice(-10).map((item) => ({
    date: formatDate(item.date),
    score: item.score,
    gameType: item.gameType,
  }));

  // Prepare data for Memory Game performance
  const memoryTrendData =
    stats.memoryStats.recentGames?.map((game) => ({
      date: formatDate(game.date),
      moves: game.moves,
      time: game.seconds,
    })) || [];

  // Prepare data for Quiz performance trend
  const quizTrendData =
    stats.quizStats.recentScores?.map((game) => ({
      date: formatDate(game.date),
      score: game.score,
    })) || [];

  // Prepare data for Word Scramble performance trend
  const wordScrambleTrendData =
    stats.wordScrambleStats?.recentScores?.map((game) => ({
      date: formatDate(game.date),
      score: game.score,
    })) || [];

  // Prepare data for Math Challenge performance trend
  const mathChallengeTrendData =
    stats.mathChallengeStats?.recentScores?.map((game) => ({
      date: formatDate(game.date),
      score: game.score,
    })) || [];

  // Prepare data for Pattern Match performance trend
  const patternMatchTrendData =
    stats.patternMatchStats?.recentScores?.map((game) => ({
      date: formatDate(game.date),
      score: game.score,
    })) || [];

  return (
    <div className="space-y-6">
      {/* Overall Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Games</h3>
          <p className="text-4xl font-bold">{stats.totalGames}</p>
        </div>

        {stats.quizStats.count > 0 && (
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">📘 Quiz</h3>
            <p className="text-3xl font-bold">
              {stats.quizStats.averageScore}%
            </p>
            <p className="text-sm mt-2">Best: {stats.quizStats.bestScore}%</p>
          </div>
        )}

        {stats.memoryStats.count > 0 && (
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">🧠 Memory</h3>
            <p className="text-2xl font-bold">
              {stats.memoryStats.averageMoves} moves
            </p>
            <p className="text-sm mt-2">
              Best: {stats.memoryStats.bestMoves} moves
            </p>
          </div>
        )}

        {stats.wordScrambleStats?.count > 0 && (
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg shadow-md p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">📝 Word Scramble</h3>
            <p className="text-3xl font-bold">
              {stats.wordScrambleStats.averageScore}%
            </p>
            <p className="text-sm mt-2">
              Best: {stats.wordScrambleStats.bestScore}%
            </p>
          </div>
        )}

        {stats.mathChallengeStats?.count > 0 && (
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">🔢 Math Challenge</h3>
            <p className="text-3xl font-bold">
              {stats.mathChallengeStats.averageScore}%
            </p>
            <p className="text-sm mt-2">
              Best: {stats.mathChallengeStats.bestScore}%
            </p>
          </div>
        )}

        {stats.patternMatchStats?.count > 0 && (
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg shadow-md p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">🧩 Pattern Match</h3>
            <p className="text-3xl font-bold">
              {stats.patternMatchStats.averageScore}%
            </p>
            <p className="text-sm mt-2">
              Best: {stats.patternMatchStats.bestScore}%
            </p>
          </div>
        )}
      </div>

      {/* Score Trend Chart */}
      {scoreTrendData.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Score Trend (Last 10 Games)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={scoreTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="date"
                stroke={axisColor}
                tick={{ fill: axisColor }}
              />
              <YAxis
                domain={[0, 100]}
                stroke={axisColor}
                tick={{ fill: axisColor }}
              />
              <Tooltip
                contentStyle={tooltipContentStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
              />
              <Legend wrapperStyle={legendStyle} />
              <Line
                type="monotone"
                dataKey="score"
                stroke={series.score}
                strokeWidth={3}
                dot={{
                  r: 5,
                  stroke: series.score,
                  fill: hc ? "#000000" : "#ffffff",
                }}
                activeDot={{
                  r: 7,
                  stroke: series.score,
                  fill: hc ? "#000000" : "#ffffff",
                }}
                name="Score %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Memory Game Performance Chart */}
      {memoryTrendData.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Memory Game Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={memoryTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="date"
                stroke={axisColor}
                tick={{ fill: axisColor }}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke={axisColor}
                tick={{ fill: axisColor }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke={axisColor}
                tick={{ fill: axisColor }}
              />
              <Tooltip
                contentStyle={tooltipContentStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
              />
              <Legend wrapperStyle={legendStyle} />
              <Bar
                yAxisId="left"
                dataKey="moves"
                fill={series.memoryMoves}
                name="Moves"
              />
              <Bar
                yAxisId="right"
                dataKey="time"
                fill={series.memoryTime}
                name="Time (s)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Quiz Performance Chart */}
      {quizTrendData.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            📘 Quiz Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={quizTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="date"
                stroke={axisColor}
                tick={{ fill: axisColor }}
              />
              <YAxis
                domain={[0, 100]}
                stroke={axisColor}
                tick={{ fill: axisColor }}
              />
              <Tooltip
                contentStyle={tooltipContentStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
              />
              <Legend wrapperStyle={legendStyle} />
              <Line
                type="monotone"
                dataKey="score"
                stroke={series.quiz}
                strokeWidth={3}
                dot={{
                  r: 5,
                  stroke: series.quiz,
                  fill: hc ? "#000000" : "#ffffff",
                }}
                activeDot={{
                  r: 7,
                  stroke: series.quiz,
                  fill: hc ? "#000000" : "#ffffff",
                }}
                name="Score %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Word Scramble Performance Chart */}
      {wordScrambleTrendData.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            📝 Word Scramble Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={wordScrambleTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="date"
                stroke={axisColor}
                tick={{ fill: axisColor }}
              />
              <YAxis
                domain={[0, 100]}
                stroke={axisColor}
                tick={{ fill: axisColor }}
              />
              <Tooltip
                contentStyle={tooltipContentStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
              />
              <Legend wrapperStyle={legendStyle} />
              <Line
                type="monotone"
                dataKey="score"
                stroke={series.word}
                strokeWidth={3}
                dot={{
                  r: 5,
                  stroke: series.word,
                  fill: hc ? "#000000" : "#ffffff",
                }}
                activeDot={{
                  r: 7,
                  stroke: series.word,
                  fill: hc ? "#000000" : "#ffffff",
                }}
                name="Score %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Math Challenge Performance Chart */}
      {mathChallengeTrendData.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            🔢 Math Challenge Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mathChallengeTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="date"
                stroke={axisColor}
                tick={{ fill: axisColor }}
              />
              <YAxis
                domain={[0, 100]}
                stroke={axisColor}
                tick={{ fill: axisColor }}
              />
              <Tooltip
                contentStyle={tooltipContentStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
              />
              <Legend wrapperStyle={legendStyle} />
              <Line
                type="monotone"
                dataKey="score"
                stroke={series.math}
                strokeWidth={3}
                dot={{
                  r: 5,
                  stroke: series.math,
                  fill: hc ? "#000000" : "#ffffff",
                }}
                activeDot={{
                  r: 7,
                  stroke: series.math,
                  fill: hc ? "#000000" : "#ffffff",
                }}
                name="Score %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Pattern Match Performance Chart */}
      {patternMatchTrendData.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            🧩 Pattern Match Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={patternMatchTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="date"
                stroke={axisColor}
                tick={{ fill: axisColor }}
              />
              <YAxis
                domain={[0, 100]}
                stroke={axisColor}
                tick={{ fill: axisColor }}
              />
              <Tooltip
                contentStyle={tooltipContentStyle}
                labelStyle={tooltipLabelStyle}
                itemStyle={tooltipItemStyle}
              />
              <Legend wrapperStyle={legendStyle} />
              <Line
                type="monotone"
                dataKey="score"
                stroke={series.pattern}
                strokeWidth={3}
                dot={{
                  r: 5,
                  stroke: series.pattern,
                  fill: hc ? "#000000" : "#ffffff",
                }}
                activeDot={{
                  r: 7,
                  stroke: series.pattern,
                  fill: hc ? "#000000" : "#ffffff",
                }}
                name="Score %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Detailed Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.quizStats.count > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span>📘</span> Quiz Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Games Played:</span>
                <span className="font-semibold">{stats.quizStats.count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Score:</span>
                <span className="font-semibold">
                  {stats.quizStats.averageScore}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Best Score:</span>
                <span className="font-semibold text-green-600">
                  {stats.quizStats.bestScore}%
                </span>
              </div>
            </div>
          </div>
        )}

        {stats.memoryStats.count > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span>🧠</span> Memory Game Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Games Played:</span>
                <span className="font-semibold">{stats.memoryStats.count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Moves:</span>
                <span className="font-semibold">
                  {stats.memoryStats.averageMoves}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Best Moves:</span>
                <span className="font-semibold text-purple-600">
                  {stats.memoryStats.bestMoves}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Time:</span>
                <span className="font-semibold">
                  {stats.memoryStats.averageTime}s
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Best Time:</span>
                <span className="font-semibold text-purple-600">
                  {stats.memoryStats.bestTime}s
                </span>
              </div>
            </div>
          </div>
        )}

        {stats.wordScrambleStats?.count > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span>📝</span> Word Scramble Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Games Played:</span>
                <span className="font-semibold">
                  {stats.wordScrambleStats.count}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Score:</span>
                <span className="font-semibold">
                  {stats.wordScrambleStats.averageScore}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Best Score:</span>
                <span className="font-semibold text-cyan-600">
                  {stats.wordScrambleStats.bestScore}%
                </span>
              </div>
            </div>
          </div>
        )}

        {stats.mathChallengeStats?.count > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span>🔢</span> Math Challenge Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Games Played:</span>
                <span className="font-semibold">
                  {stats.mathChallengeStats.count}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Score:</span>
                <span className="font-semibold">
                  {stats.mathChallengeStats.averageScore}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Best Score:</span>
                <span className="font-semibold text-orange-600">
                  {stats.mathChallengeStats.bestScore}%
                </span>
              </div>
            </div>
          </div>
        )}

        {stats.patternMatchStats?.count > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <span>🧩</span> Pattern Match Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Games Played:</span>
                <span className="font-semibold">
                  {stats.patternMatchStats.count}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Score:</span>
                <span className="font-semibold">
                  {stats.patternMatchStats.averageScore}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Best Score:</span>
                <span className="font-semibold text-pink-600">
                  {stats.patternMatchStats.bestScore}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceCharts;
