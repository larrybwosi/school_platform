'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DepartmentList } from './components/department-list';
import { LeadersList } from './components/leaders-list';
import { MembersList } from './components/members-list';
import { CreateDepartmentDialog } from './components/create-department-dialog';

export default function DepartmentsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Departments Management</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="departments" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="departments">Departments</TabsTrigger>
              <TabsTrigger value="leaders">Leaders</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>
            <TabsContent value="departments">
              <DepartmentList />
            </TabsContent>
            <TabsContent value="leaders">
              <LeadersList />
            </TabsContent>
            <TabsContent value="members">
              <MembersList />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <CreateDepartmentDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
