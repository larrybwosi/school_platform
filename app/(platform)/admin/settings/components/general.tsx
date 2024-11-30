import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, MinusCircle } from 'lucide-react';

interface InstitutionData {
  name: string;
  type: string;
  foundingYear: string;
  motto: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  accreditations: string[];
  facilities: string[];
}

interface GeneralSettingsProps {
  institutionData: InstitutionData;
  onInstitutionDataChange: (newData: Partial<InstitutionData>) => void;
}

export function GeneralSettings({ institutionData, onInstitutionDataChange }: GeneralSettingsProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onInstitutionDataChange({ [name]: value });
  };

  const handleSocialMediaChange = (platform: keyof InstitutionData['socialMedia'], value: string) => {
    onInstitutionDataChange({
      socialMedia: { ...institutionData.socialMedia, [platform]: value },
    });
  };

  const handleArrayChange = (field: 'accreditations' | 'facilities', index: number, value: string) => {
    const newArray = [...institutionData[field]];
    newArray[index] = value;
    onInstitutionDataChange({ [field]: newArray });
  };

  const handleAddArrayItem = (field: 'accreditations' | 'facilities') => {
    onInstitutionDataChange({ [field]: [...institutionData[field], ''] });
  };

  const handleRemoveArrayItem = (field: 'accreditations' | 'facilities', index: number) => {
    const newArray = institutionData[field].filter((_, i) => i !== index);
    onInstitutionDataChange({ [field]: newArray });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Institution Information</CardTitle>
          <CardDescription>
            Manage your institution&apos;s basic information and branding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Institution Name</Label>
              <Input
                id="name"
                name="name"
                value={institutionData.name}
                onChange={handleInputChange}
                placeholder="Enter institution name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Institution Type</Label>
              <Select
                value={institutionData.type}
                onValueChange={(value) => onInstitutionDataChange({ type: value })}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select institution type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="K-12">K-12</SelectItem>
                  <SelectItem value="Higher Education">Higher Education</SelectItem>
                  <SelectItem value="Vocational">Vocational</SelectItem>
                  <SelectItem value="Special Education">Special Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="foundingYear">Founding Year</Label>
              <Input
                id="foundingYear"
                name="foundingYear"
                value={institutionData.foundingYear}
                onChange={handleInputChange}
                placeholder="Enter founding year"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="motto">Motto</Label>
              <Input
                id="motto"
                name="motto"
                value={institutionData.motto}
                onChange={handleInputChange}
                placeholder="Enter institution motto"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="logo">Logo URL</Label>
            <Input
              id="logo"
              name="logo"
              value={institutionData.logo}
              onChange={handleInputChange}
              placeholder="Enter logo URL"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>
            Manage your institution&apos;s contact details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={institutionData.email}
                onChange={handleInputChange}
                placeholder="Enter contact email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={institutionData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={institutionData.address}
              onChange={handleInputChange}
              placeholder="Enter institution address"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              value={institutionData.website}
              onChange={handleInputChange}
              placeholder="Enter website URL"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
          <CardDescription>
            Manage your institution&apos;s social media presence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={institutionData.socialMedia.facebook}
                onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                placeholder="Enter Facebook URL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={institutionData.socialMedia.twitter}
                onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                placeholder="Enter Twitter URL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={institutionData.socialMedia.instagram}
                onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                placeholder="Enter Instagram URL"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accreditations and Facilities</CardTitle>
          <CardDescription>
            Manage your institution&apos;s accreditations and facilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Accreditations</Label>
            {institutionData.accreditations.map((accreditation, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={accreditation}
                  onChange={(e) => handleArrayChange('accreditations', index, e.target.value)}
                  placeholder="Enter accreditation"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveArrayItem('accreditations', index)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => handleAddArrayItem('accreditations')}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Accreditation
            </Button>
          </div>
          <Separator />
          <div className="space-y-2">
            <Label>Facilities</Label>
            {institutionData.facilities.map((facility, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={facility}
                  onChange={(e) => handleArrayChange('facilities', index, e.target.value)}
                  placeholder="Enter facility"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveArrayItem('facilities', index)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => handleAddArrayItem('facilities')}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Facility
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button className="w-full">Save General Settings</Button>
    </div>
  );
}

