'use client'
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, PieChart, Pie, Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  DollarSign, Users, GraduationCap, TrendingUp, Building2, 
  ArrowUpRight, ArrowDownRight, Building, Wallet, CalendarRange,
  BookOpen, Download, Filter, RefreshCcw, Bell, Search,
  PieChart as PieChartIcon, ArrowRight
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FinanceDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6M");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [showNotification, setShowNotification] = useState(true);

  // Enhanced sample data
  const revenueData = [
    {
      month: "Jan",
      revenue: 2400000,
      donations: 800000,
      grants: 400000,
      tuition: 1200000,
    },
    {
      month: "Feb",
      revenue: 2100000,
      donations: 600000,
      grants: 500000,
      tuition: 1000000,
    },
    {
      month: "Mar",
      revenue: 2800000,
      donations: 900000,
      grants: 600000,
      tuition: 1300000,
    },
    {
      month: "Apr",
      revenue: 2600000,
      donations: 700000,
      grants: 700000,
      tuition: 1200000,
    },
    {
      month: "May",
      revenue: 3100000,
      donations: 1000000,
      grants: 800000,
      tuition: 1300000,
    },
    {
      month: "Jun",
      revenue: 2900000,
      donations: 800000,
      grants: 900000,
      tuition: 1200000,
    },
  ];

  const expenseData = [
    {
      month: "Jan",
      expenses: 1800000,
      budget: 2000000,
      facilities: 500000,
      salaries: 1000000,
      research: 300000,
    },
    {
      month: "Feb",
      expenses: 1600000,
      budget: 2000000,
      facilities: 400000,
      salaries: 900000,
      research: 300000,
    },
    {
      month: "Mar",
      expenses: 2100000,
      budget: 2000000,
      facilities: 600000,
      salaries: 1100000,
      research: 400000,
    },
    {
      month: "Apr",
      expenses: 1900000,
      budget: 2000000,
      facilities: 500000,
      salaries: 1000000,
      research: 400000,
    },
    {
      month: "May",
      expenses: 2300000,
      budget: 2000000,
      facilities: 700000,
      salaries: 1200000,
      research: 400000,
    },
    {
      month: "Jun",
      expenses: 2200000,
      budget: 2000000,
      facilities: 600000,
      salaries: 1200000,
      research: 400000,
    },
  ];

  const statsCards = [
    {
      title: "Total Revenue",
      value: "$16.9M",
      change: "+12.3%",
      trend: "up",
      icon: DollarSign,
      details: "YTD Growth",
    },
    {
      title: "Students Enrolled",
      value: "24,583",
      change: "+5.2%",
      trend: "up",
      icon: Users,
      details: "Fall Semester",
    },
    {
      title: "Average Tuition",
      value: "$32,450",
      change: "-2.1%",
      trend: "down",
      icon: GraduationCap,
      details: "Per Academic Year",
    },
    {
      title: "Research Grants",
      value: "$8.2M",
      change: "+18.7%",
      trend: "up",
      icon: TrendingUp,
      details: "Active Grants",
    },
  ];

  const departments = [
    {
      name: "Engineering",
      budget: 4500000,
      spent: 3800000,
      students: 4200,
      faculty: 180,
    },
    {
      name: "Business",
      budget: 3800000,
      spent: 3200000,
      students: 3800,
      faculty: 150,
    },
    {
      name: "Sciences",
      budget: 4200000,
      spent: 3900000,
      students: 3500,
      faculty: 160,
    },
    {
      name: "Arts",
      budget: 2800000,
      spent: 2100000,
      students: 2800,
      faculty: 120,
    },
    {
      name: "Medicine",
      budget: 5100000,
      spent: 4800000,
      students: 1200,
      faculty: 200,
    },
  ];

  const revenueBreakdown = [
    { name: "Tuition", value: 45, color: "#4F46E5" },
    { name: "Research Grants", value: 25, color: "#10B981" },
    { name: "Donations", value: 20, color: "#F59E0B" },
    { name: "Other", value: 10, color: "#6B7280" },
  ];

  const filterPeriods = ["1M", "3M", "6M", "1Y", "ALL"];

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header with Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Academic Year 2024-2025
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Bell className="h-5 w-5" />
            {showNotification && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      {/* Notification Alert */}
      {showNotification && (
        <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <AlertTitle className="flex items-center gap-2">
            <RefreshCcw className="h-4 w-4" />
            Dashboard Updated
          </AlertTitle>
          <AlertDescription>
            Financial data has been updated with the latest figures from all
            departments.
          </AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filters:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filterPeriods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedPeriod === period
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-3 py-1 rounded-lg border bg-white dark:bg-gray-700"
        >
          <option value="All">All Departments</option>
          {departments.map((dept) => (
            <option key={dept.name} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
        <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.details}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`ml-1 ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>Monthly revenue by source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tuition" stackId="a" fill="#4F46E5" />
                  <Bar dataKey="grants" stackId="a" fill="#10B981" />
                  <Bar dataKey="donations" stackId="a" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expenses Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Expenses Analysis</CardTitle>
            <CardDescription>Monthly expenses vs budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={expenseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="expenses" stroke="#EF4444" />
                  <Line type="monotone" dataKey="budget" stroke="#10B981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Budgets and Revenue Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Budgets */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Department Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {departments.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{dept.name}</span>
                      <div className="text-sm text-gray-500">
                        {dept.faculty} Faculty · {dept.students} Students
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        ${(dept.spent / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-sm text-gray-500">
                        of ${(dept.budget / 1000000).toFixed(1)}M
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${(dept.spent / dept.budget) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Distribution Pie Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5" />
              Revenue Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {revenueBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend with additional details */}
            <div className="mt-4 space-y-2">
              {revenueBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { icon: Download, label: "Download Financial Report" },
                { icon: BookOpen, label: "View Budget Proposals" },
                { icon: CalendarRange, label: "Schedule Budget Review" },
                { icon: Wallet, label: "Manage Department Funds" },
              ].map((action, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <action.icon className="h-5 w-5 text-blue-500" />
                    <span>{action.label}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Latest financial activities across departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  dept: "Engineering",
                  amount: 125000,
                  type: "Equipment Purchase",
                  date: "2024-01-10",
                },
                {
                  dept: "Medicine",
                  amount: 75000,
                  type: "Research Grant",
                  date: "2024-01-09",
                },
                {
                  dept: "Business",
                  amount: 45000,
                  type: "Conference Budget",
                  date: "2024-01-08",
                },
                {
                  dept: "Sciences",
                  amount: 95000,
                  type: "Lab Supplies",
                  date: "2024-01-07",
                },
              ].map((transaction, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium">{transaction.dept}</div>
                      <div className="text-sm text-gray-500">
                        {transaction.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">
                      ${transaction.amount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer with Additional Info */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Last updated: {new Date().toLocaleString()}</p>
        <p>Financial data is refreshed daily at midnight EST</p>
      </div>
    </div>
  );
};

export default FinanceDashboard;