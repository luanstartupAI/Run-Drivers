import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { 
  Wallet, 
  CreditCard, 
  TrendingUp, 
  Download, 
  Upload, 
  History,
  Plus,
  Minus,
  DollarSign,
  Banknote,
  PiggyBank,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const WalletPage = () => {
  const [balance, setBalance] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      
      // Mock data - in real app, these would be API calls
      const mockBalance = {
        available_balance: 1250.75,
        pending_balance: 150.25,
        total_earnings: 3250.75,
        currency: "BRL",
        last_updated: "2024-08-05T15:30:00Z"
      };

      const mockTransactions = [
        {
          id: 1,
          driver_id: "driver_001",
          type: "credit",
          amount: 25.50,
          description: "Trip completed - Ana Silva",
          status: "completed",
          created_at: "2024-08-05T14:55:00Z",
          reference: "TRIP_001"
        },
        {
          id: 2,
          driver_id: "driver_001",
          type: "credit",
          amount: 32.80,
          description: "Trip completed - Carlos Santos",
          status: "completed",
          created_at: "2024-08-05T10:50:00Z",
          reference: "TRIP_002"
        },
        {
          id: 3,
          driver_id: "driver_001",
          type: "debit",
          amount: -100.00,
          description: "Withdrawal to bank account",
          status: "completed",
          created_at: "2024-08-04T16:30:00Z",
          reference: "WITHDRAWAL_001"
        },
        {
          id: 4,
          driver_id: "driver_001",
          type: "credit",
          amount: 45.20,
          description: "Trip completed - Maria Costa",
          status: "completed",
          created_at: "2024-08-04T17:05:00Z",
          reference: "TRIP_003"
        },
        {
          id: 5,
          driver_id: "driver_001",
          type: "credit",
          amount: 15.00,
          description: "Bonus - Weekly goal achieved",
          status: "completed",
          created_at: "2024-08-03T12:00:00Z",
          reference: "BONUS_001"
        }
      ];

      const mockPaymentMethods = [
        {
          id: 1,
          type: "bank_account",
          name: "Banco do Brasil",
          account_number: "****1234",
          is_default: true,
          is_verified: true
        },
        {
          id: 2,
          type: "pix",
          name: "PIX Key",
          key: "joao.silva@email.com",
          is_default: false,
          is_verified: true
        },
        {
          id: 3,
          type: "credit_card",
          name: "Visa ****4321",
          card_number: "****4321",
          is_default: false,
          is_verified: true
        }
      ];

      const mockWithdrawals = [
        {
          id: 1,
          driver_id: "driver_001",
          amount: 100.00,
          payment_method: "bank_account",
          status: "completed",
          created_at: "2024-08-04T16:30:00Z",
          processed_at: "2024-08-04T17:00:00Z"
        },
        {
          id: 2,
          driver_id: "driver_001",
          amount: 250.00,
          payment_method: "pix",
          status: "pending",
          created_at: "2024-08-05T10:00:00Z",
          processed_at: null
        }
      ];

      const mockStatistics = {
        total_earnings: 3250.75,
        total_withdrawals: 350.00,
        monthly_earnings: 975.23,
        average_transaction: 65.02,
        total_transactions: 50,
        pending_withdrawals: 1
      };

      setBalance(mockBalance);
      setTransactions(mockTransactions);
      setPaymentMethods(mockPaymentMethods);
      setWithdrawals(mockWithdrawals);
      setStatistics(mockStatistics);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      if (!withdrawAmount || !selectedPaymentMethod) return;
      
      const withdrawal = {
        id: withdrawals.length + 1,
        driver_id: "driver_001",
        amount: parseFloat(withdrawAmount),
        payment_method: selectedPaymentMethod,
        status: "pending",
        created_at: new Date().toISOString(),
        processed_at: null
      };
      
      setWithdrawals(prev => [withdrawal, ...prev]);
      setBalance(prev => ({
        ...prev,
        available_balance: prev.available_balance - parseFloat(withdrawAmount),
        pending_balance: prev.pending_balance + parseFloat(withdrawAmount)
      }));
      
      setWithdrawAmount('');
      setSelectedPaymentMethod('');
      setShowWithdrawDialog(false);
      
      // In real app: await api.post('/api/wallet/withdraw', withdrawal);
    } catch (error) {
      console.error('Error withdrawing:', error);
    }
  };

  const handleDeposit = async () => {
    try {
      if (!depositAmount) return;
      
      const transaction = {
        id: transactions.length + 1,
        driver_id: "driver_001",
        type: "credit",
        amount: parseFloat(depositAmount),
        description: "Manual deposit",
        status: "completed",
        created_at: new Date().toISOString(),
        reference: `DEPOSIT_${transactions.length + 1}`
      };
      
      setTransactions(prev => [transaction, ...prev]);
      setBalance(prev => ({
        ...prev,
        available_balance: prev.available_balance + parseFloat(depositAmount),
        total_earnings: prev.total_earnings + parseFloat(depositAmount)
      }));
      
      setDepositAmount('');
      setShowDepositDialog(false);
      
      // In real app: await api.post('/api/wallet/deposit', transaction);
    } catch (error) {
      console.error('Error depositing:', error);
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'credit':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'debit':
        return <Minus className="w-4 h-4 text-red-600" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Carteira</h1>
        <div className="flex gap-2">
          <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="w-4 h-4 mr-2" />
                Depositar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Fazer Depósito</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="deposit-amount">Valor (R$)</Label>
                  <Input
                    id="deposit-amount"
                    type="number"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleDeposit} className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Depositar
                  </Button>
                  <Button variant="outline" onClick={() => setShowDepositDialog(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Sacar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Solicitar Saque</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">Valor (R$)</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment-method">Método de Pagamento</Label>
                  <select
                    id="payment-method"
                    className="w-full p-2 border rounded-md"
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  >
                    <option value="">Selecione um método</option>
                    {paymentMethods.map((method) => (
                      <option key={method.id} value={method.type}>
                        {method.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleWithdraw} className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Solicitar Saque
                  </Button>
                  <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Wallet className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Saldo Disponível</p>
                <p className="text-2xl font-bold text-green-600">
                  R$ {balance.available_balance?.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Saldo Pendente</p>
                <p className="text-2xl font-bold text-yellow-600">
                  R$ {balance.pending_balance?.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Ganhos Totais</p>
                <p className="text-2xl font-bold text-blue-600">
                  R$ {balance.total_earnings?.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          <TabsTrigger value="withdrawals">Saques</TabsTrigger>
          <TabsTrigger value="payment-methods">Métodos de Pagamento</TabsTrigger>
          <TabsTrigger value="statistics">Estatísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Histórico de Transações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(transaction.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'credit' ? '+' : ''}R$ {transaction.amount.toFixed(2)}
                      </p>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status === 'completed' ? 'Concluída' : 'Pendente'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdrawals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Solicitações de Saque
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {withdrawals.map((withdrawal) => (
                  <div key={withdrawal.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Download className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-medium">Saque para {withdrawal.payment_method}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(withdrawal.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">
                        -R$ {withdrawal.amount.toFixed(2)}
                      </p>
                      <Badge className={getStatusColor(withdrawal.status)}>
                        {withdrawal.status === 'completed' ? 'Processado' : 'Pendente'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment-methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Métodos de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-600">
                          {method.account_number || method.key || method.card_number}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {method.is_verified && (
                        <Badge variant="outline" className="text-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verificado
                        </Badge>
                      )}
                      {method.is_default && (
                        <Badge variant="default">
                          Padrão
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Estatísticas da Carteira
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">R$ {statistics.total_earnings}</div>
                  <div className="text-sm text-gray-600">Ganhos Totais</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">R$ {statistics.total_withdrawals}</div>
                  <div className="text-sm text-gray-600">Saques Totais</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">R$ {statistics.monthly_earnings}</div>
                  <div className="text-sm text-gray-600">Ganhos Mensais</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">R$ {statistics.average_transaction}</div>
                  <div className="text-sm text-gray-600">Média por Transação</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Resumo de Transações</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Total de Transações</span>
                      <span className="font-semibold">{statistics.total_transactions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Saques Pendentes</span>
                      <span className="font-semibold">{statistics.pending_withdrawals}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Saldo Disponível</span>
                      <span className="font-semibold text-green-600">R$ {balance.available_balance?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Informações de Segurança</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Carteira Protegida</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Métodos Verificados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PiggyBank className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Ganhos Seguros</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WalletPage;