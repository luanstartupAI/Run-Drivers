import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

const TabLayout = ({ 
  children, 
  tabs = [],
  defaultTab = "",
  className = "",
  showCard = true
}) => {
  if (!tabs.length) {
    return <div className={className}>{children}</div>;
  }

  const content = (
    <Tabs defaultValue={defaultTab || tabs[0]?.value} className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.icon && <tab.icon className="w-4 h-4 mr-2" />}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );

  if (showCard) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          {content}
        </CardContent>
      </Card>
    );
  }

  return <div className={className}>{content}</div>;
};

export default TabLayout;