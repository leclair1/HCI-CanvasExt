import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Github, 
  Trello, 
  FileText, 
  LayoutGrid, 
  MessageSquare, 
  Calendar,
  GitBranch,
  CheckSquare,
  Check,
  Settings,
  Link2,
  ExternalLink
} from 'lucide-react';
import { mockIntegrations, type Integration } from '../lib/mockData';
import { toast } from 'sonner@2.0.3';

const iconMap: Record<string, any> = {
  Github,
  Trello,
  FileText,
  LayoutGrid,
  MessageSquare,
  Calendar,
  GitBranch,
  CheckSquare,
};

export default function IntegrationsPanel() {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [apiUrl, setApiUrl] = useState('');

  const handleConnect = (integration: Integration) => {
    setIntegrations(prev =>
      prev.map(int =>
        int.id === integration.id
          ? { ...int, connected: true }
          : int
      )
    );
    toast.success(`Successfully connected to ${integration.name}`, {
      description: 'You can now use this integration with Canvas Tailored'
    });
    setSelectedIntegration(null);
    setApiKey('');
    setApiUrl('');
  };

  const handleDisconnect = (integration: Integration) => {
    setIntegrations(prev =>
      prev.map(int =>
        int.id === integration.id
          ? { ...int, connected: false }
          : int
      )
    );
    toast.success(`Disconnected from ${integration.name}`);
  };

  const connectedIntegrations = integrations.filter(i => i.connected);
  const availableIntegrations = integrations.filter(i => !i.connected);

  const IntegrationCard = ({ integration }: { integration: Integration }) => {
    const IconComponent = iconMap[integration.icon] || Link2;
    
    return (
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-4">
          <div 
            className="p-3 rounded-lg"
            style={{ backgroundColor: `${integration.color}15` }}
          >
            <IconComponent 
              className="h-6 w-6" 
              style={{ color: integration.color }}
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="text-foreground mb-1">{integration.name}</h4>
                <Badge variant="outline" className="mb-3">
                  {integration.category}
                </Badge>
              </div>
              {integration.connected && (
                <Badge variant="default" className="gap-1">
                  <Check className="h-3 w-3" />
                  Connected
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              {integration.description}
            </p>
            
            <div className="space-y-2 mb-4">
              <p className="text-xs font-medium text-foreground">Features:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                {integration.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex gap-2">
              {integration.connected ? (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedIntegration(integration)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{integration.name} Settings</DialogTitle>
                        <DialogDescription>
                          Configure your {integration.name} integration settings
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <Label>API URL</Label>
                          <Input 
                            value={integration.apiUrl || ''} 
                            readOnly 
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label>Connection Status</Label>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-sm text-muted-foreground">Active</span>
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="mb-2">Permissions</h4>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            {integration.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-green-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="destructive" 
                          onClick={() => handleDisconnect(integration)}
                        >
                          Disconnect
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDisconnect(integration)}
                  >
                    Disconnect
                  </Button>
                </>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => {
                        setSelectedIntegration(integration);
                        setApiUrl(integration.apiUrl || '');
                      }}
                    >
                      Connect
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Connect to {integration.name}</DialogTitle>
                      <DialogDescription>
                        Enter your {integration.name} credentials to connect
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label>API URL</Label>
                        <Input 
                          value={apiUrl}
                          onChange={(e) => setApiUrl(e.target.value)}
                          placeholder={integration.apiUrl}
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Your {integration.name} API endpoint
                        </p>
                      </div>
                      <div>
                        <Label>API Key / Token</Label>
                        <Input 
                          type="password"
                          value={apiKey}
                          onChange={(e) => setApiKey(e.target.value)}
                          placeholder="Enter your API key"
                          className="mt-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Get your API key from your {integration.name} account settings
                        </p>
                      </div>
                      <Separator />
                      <div>
                        <h4 className="mb-2">This integration will be able to:</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          {integration.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setSelectedIntegration(null);
                          setApiKey('');
                          setApiUrl('');
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={() => selectedIntegration && handleConnect(selectedIntegration)}
                        disabled={!apiKey || !apiUrl}
                      >
                        Connect
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-foreground mb-2">Integrations</h1>
        <p className="text-muted-foreground">
          Connect Canvas Tailored with your favorite tools to streamline your workflow
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            All Integrations ({integrations.length})
          </TabsTrigger>
          <TabsTrigger value="connected">
            Connected ({connectedIntegrations.length})
          </TabsTrigger>
          <TabsTrigger value="available">
            Available ({availableIntegrations.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Connected Integrations */}
          {connectedIntegrations.length > 0 && (
            <div>
              <h3 className="text-foreground mb-4">Connected</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {connectedIntegrations.map(integration => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
              </div>
            </div>
          )}

          {/* Available Integrations */}
          {availableIntegrations.length > 0 && (
            <div>
              <h3 className="text-foreground mb-4">Available</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {availableIntegrations.map(integration => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="connected" className="space-y-4">
          {connectedIntegrations.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {connectedIntegrations.map(integration => (
                <IntegrationCard key={integration.id} integration={integration} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Link2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-foreground mb-2">No Connected Integrations</h3>
              <p className="text-muted-foreground mb-4">
                Connect your favorite tools to get started
              </p>
              <Button onClick={() => document.querySelector('[value="available"]')?.dispatchEvent(new Event('click', { bubbles: true }))}>
                Browse Available Integrations
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {availableIntegrations.map(integration => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Info Card */}
      <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
        <div className="flex gap-4">
          <ExternalLink className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-foreground mb-2">Need Help?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Check out our documentation for detailed setup guides for each integration. 
              API keys and tokens are securely stored and never shared.
            </p>
            <Button variant="outline" size="sm">
              View Integration Guides
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
