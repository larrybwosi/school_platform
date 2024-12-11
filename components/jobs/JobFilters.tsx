import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check } from 'lucide-react';

export const JobFilters = () => {
  return (
    <aside className="w-72 flex-shrink-0 bg-white rounded-lg shadow-sm p-6">
      <div className="space-y-6">
        {/* Salary Range */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Salary Range</h3>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            defaultValue={[50000, 150000]}
            min={0}
            max={200000}
            step={5000}
          >
            <Slider.Track className="bg-[#f5f6f8] relative grow rounded-full h-[3px]">
              <Slider.Range className="absolute bg-[#2557a7] rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-white border-2 border-[#2557a7] rounded-full hover:bg-[#f5f6f8] focus:outline-none"
              aria-label="Minimum salary"
            />
            <Slider.Thumb
              className="block w-5 h-5 bg-white border-2 border-[#2557a7] rounded-full hover:bg-[#f5f6f8] focus:outline-none"
              aria-label="Maximum salary"
            />
          </Slider.Root>
        </div>

        {/* Experience Level */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Experience Level</h3>
          <div className="space-y-2">
            {['Entry Level', 'Mid Level', 'Senior Level', 'Lead'].map((level) => (
              <div key={level} className="flex items-center">
                <Checkbox.Root
                  className="flex h-4 w-4 items-center justify-center rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2557a7] focus:ring-offset-2"
                  id={level}
                >
                  <Checkbox.Indicator>
                    <Check className="h-3 w-3 text-[#2557a7]" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <label
                  className="ml-2 text-sm text-gray-600 cursor-pointer"
                  htmlFor={level}
                >
                  {level}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Job Type */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Job Type</h3>
          <ToggleGroup.Root
            className="flex flex-col gap-2"
            type="multiple"
            aria-label="Job Type"
          >
            {['Remote', 'Hybrid', 'On-site'].map((type) => (
              <ToggleGroup.Item
                key={type}
                value={type.toLowerCase()}
                className="flex items-center justify-center px-3 py-2 rounded-md border border-gray-200 text-sm hover:bg-[#f5f6f8] data-[state=on]:bg-[#2557a7] data-[state=on]:text-white"
              >
                {type}
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
        </div>
      </div>
    </aside>
  );
};