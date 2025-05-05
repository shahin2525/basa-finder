"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import React from "react";

const RentCalculator = () => {
  // State for calculator (simplified example)
  const [income, setIncome] = React.useState<number>(5000);
  const [rentBudget, setRentBudget] = React.useState<number>(1500);

  const calculateRecommendedRent = () => {
    return Math.floor(income * 0.3); // 30% rule
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Rent Affordability Calculator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calculator Card */}
        <Card>
          <CardHeader>
            <CardTitle>Calculate Your Rent Budget</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="income">Monthly Income (after tax)</Label>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>Recommended Rent Budget (30% rule)</Label>
              <div className="text-2xl font-semibold">
                ${calculateRecommendedRent().toLocaleString()}/month
              </div>
              <Slider
                defaultValue={[30]}
                max={50}
                step={1}
                className="w-full"
                onValueChange={(value) =>
                  setRentBudget(Math.floor(income * (value[0] / 100)))
                }
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>20%</span>
                <span>30%</span>
                <span>40%</span>
                <span>50%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Your Custom Budget</Label>
              <Input
                type="number"
                value={rentBudget}
                onChange={(e) => setRentBudget(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <Button className="w-full">Save Calculation</Button>
          </CardContent>
        </Card>

        {/* Rental Guidelines Card */}
        <Card>
          <CardHeader>
            <CardTitle>Rent Affordability Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">
                How much should I spend on rent?
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>30% Rule:</strong> Spend no more than 30% of your
                  gross monthly income on rent
                </li>
                <li>
                  <strong>50/30/20 Rule:</strong> 50% needs, 30% wants, 20%
                  savings (rent falls under needs)
                </li>
                <li>
                  <strong>City Variations:</strong> In expensive cities, up to
                  40% may be acceptable
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Factors to Consider</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Utilities (often not included in rent)</li>
                <li>Transportation costs based on location</li>
                <li>Security deposits (typically 1-2 months rent)</li>
                <li>Renters insurance (~$15-$30/month)</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Tips for Saving on Rent</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Consider roommates to split costs</li>
                <li>Look for rent-controlled apartments</li>
                <li>Negotiate rent, especially in off-peak seasons</li>
                <li>Check for income-based housing programs</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Resources Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Rent vs. Buy Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Determine whether renting or buying makes more financial sense
                for your situation.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Neighborhood Cost Comparisons</CardTitle>
            </CardHeader>
            <CardContent>
              <p>See how rental prices vary across different neighborhoods.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Moving Cost Estimator</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Calculate all the expenses associated with moving to a new
                rental.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RentCalculator;
