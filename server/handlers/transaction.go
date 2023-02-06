package handlers

import (
	"encoding/json"
	dto "housy/dto/result"
	transactiondto "housy/dto/transaction"
	"housy/models"
	"housy/repositories"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
	"github.com/midtrans/midtrans-go/snap"
)

var c = coreapi.Client{
	ServerKey: os.Getenv("SERVER_KEY"),
	ClientKey:  os.Getenv("CLIENT_KEY"),
  }

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository}
}

func (h *handlerTransaction) FindTransactions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	transactions, err := h.TransactionRepository.FindTransaction()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: transactions}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) GetTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: transaction}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) CreateTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// HouseId, _ := strconv.Atoi(r.FormValue("house_id"))
	// UserId, _ := strconv.Atoi(r.FormValue("user_id"))
	// Total, _ := strconv.Atoi(r.FormValue("total"))
	// request := transactiondto.RequestTransaction{
	// 	CheckIn:       r.FormValue("check_in"),
	// 	CheckOut:      r.FormValue("check_out"),
	// 	HouseId:       HouseId,
	// 	UserId:        UserId,
	// 	Total:         Total,
	// 	StatusPayment: r.FormValue("status_payment"),
	// }

	// if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
	// 	json.NewEncoder(w).Encode(response)
	// 	return
	// }

	// validation := validator.New()
	// err := validation.Struct(request)
	// if err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
	// 	json.NewEncoder(w).Encode(response)
	// 	return
	// }

	// transaction := models.Transaction{
	// 	CheckIn:       request.CheckIn,
	// 	CheckOut:      request.CheckOut,
	// 	HouseId:       request.HouseId,
	// 	UserId:        request.UserId,
	// 	Total:         request.Total,
	// 	StatusPayment: request.StatusPayment,
	// }

	// data, err := h.TransactionRepository.CreateTransaction(transaction)
	// if err != nil {
	// 	w.WriteHeader(http.StatusInternalServerError)
	// 	response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
	// 	json.NewEncoder(w).Encode(response)
	// }

	// w.WriteHeader(http.StatusOK)
	// response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponseTransaction(data)}
	// json.NewEncoder(w).Encode(response)

	userInfo := r.Context().Value("userInfo").(jwt.MapClaims)
	userId := int(userInfo["id"].(float64))

	var request transactiondto.RequestTransaction
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	var TransIdIsMatch = false
	var TransactionId int
	for !TransIdIsMatch {
		TransactionId = int(time.Now().Unix()) // 12948129048123
		transactionData, _ := h.TransactionRepository.GetTransaction(TransactionId)
		if transactionData.ID == 0 {
			TransIdIsMatch = true
		}
	}

	transaction := models.Transaction{
		CheckIn:       request.CheckIn,
		CheckOut:      request.CheckOut,
		HouseId:       request.HouseId,
		UserId:        userId,
		Total:         request.Total,
		StatusPayment: request.StatusPayment,
	// }
	}

	log.Print(transaction)

	newTransaction, err := h.TransactionRepository.CreateTransaction(transaction) //112233
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}

	dataTransactions, err := h.TransactionRepository.GetTransaction(newTransaction.ID) //112233
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
		return
	}

	s := snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)

	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(dataTransactions.ID), //112233
			GrossAmt: int64(dataTransactions.Total),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: dataTransactions.User.Fullname,
			Email: dataTransactions.User.Email,
		},
	}

	snapResp, err := s.CreateTransaction(req)

	// if err != nil {
	// 	w.WriteHeader(http.StatusInternalServerError)
	// 	json.NewEncoder(w).Encode(err.Error())
	// 	return
	// }

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: snapResp}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerTransaction) Notification(w http.ResponseWriter, r *http.Request) {
	var notificationPayload map[string]interface{}
  
	err := json.NewDecoder(r.Body).Decode(&notificationPayload)
	if err != nil {
	  w.WriteHeader(http.StatusBadRequest)
	  response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
	  json.NewEncoder(w).Encode(response)
	  return
	}
  
	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)
  
	if transactionStatus == "capture" {
	  if fraudStatus == "challenge" {
		// TODO set transaction status on your database to 'challenge'
		// e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
		h.TransactionRepository.UpdateTransaction("pending",  orderId)
	  } else if fraudStatus == "accept" {
		// TODO set transaction status on your database to 'success'
		h.TransactionRepository.UpdateTransaction("success",  orderId)
	  }
	} else if transactionStatus == "settlement" {
	  // TODO set transaction status on your databaase to 'success'
	  h.TransactionRepository.UpdateTransaction("success",  orderId)
	} else if transactionStatus == "deny" {
	  // TODO you can ignore 'deny', because most of the time it allows payment retries
	  // and later can become success
	  h.TransactionRepository.UpdateTransaction("failed",  orderId)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
	  // TODO set transaction status on your databaase to 'failure'
	  h.TransactionRepository.UpdateTransaction("failed",  orderId)
	} else if transactionStatus == "pending" {
	  // TODO set transaction status on your databaase to 'pending' / waiting payment
	  h.TransactionRepository.UpdateTransaction("pending",  orderId)
	}
  
	w.WriteHeader(http.StatusOK)
  }

// func (h *handlerTransaction) UpdateTransaction(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	HouseId, _ := strconv.Atoi(r.FormValue("house_id"))
// 	UserId, _ := strconv.Atoi(r.FormValue("user_id"))
// 	Total, _ := strconv.Atoi(r.FormValue("total"))
// 	request := transactiondto.RequestTransaction{
// 		CheckIn:       r.FormValue("check_in"),
// 		CheckOut:      r.FormValue("check_out"),
// 		HouseId:       HouseId,
// 		UserId:        UserId,
// 		Total:         Total,
// 		StatusPayment: r.FormValue("status_payment"),
// 	}

// 	id, _ := strconv.Atoi(mux.Vars(r)["id"])
// 	transaction, err := h.TransactionRepository.GetTransaction(int(id))
// 	if err != nil {
// 		w.WriteHeader(http.StatusBadRequest)
// 		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
// 		json.NewEncoder(w).Encode(response)
// 		return
// 	}

// 	if request.CheckIn != "" {
// 		transaction.CheckIn = request.CheckIn
// 	}

// 	if request.CheckOut != "" {
// 		transaction.CheckOut = request.CheckOut
// 	}

// 	if request.HouseId != 0 {
// 		transaction.HouseId = request.HouseId
// 	}

// 	if request.UserId != 0 {
// 		transaction.UserId = request.UserId
// 	}

// 	if request.Total != 0 {
// 		transaction.Total = request.Total
// 	}

// 	if request.StatusPayment != "" {
// 		transaction.StatusPayment = request.StatusPayment
// 	}

// 	data, err := h.TransactionRepository.UpdateTransaction(transaction)
// 	if err != nil {
// 		w.WriteHeader(http.StatusInternalServerError)
// 		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
// 		json.NewEncoder(w).Encode(response)
// 		return
// 	}

// 	w.WriteHeader(http.StatusOK)
// 	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
// 	json.NewEncoder(w).Encode(response)
// }

func (h *handlerTransaction) DeleteTransaction(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.TransactionRepository.DeleteTransaction(transaction)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: data}
	json.NewEncoder(w).Encode(response)
}

func convertResponseTransaction(u models.Transaction) transactiondto.ResponseTransaction {
	return transactiondto.ResponseTransaction{
		ID:            u.ID,
		CheckIn:       u.CheckIn,
		CheckOut:      u.CheckOut,
		HouseId:       u.HouseId,
		UserId:        u.UserId,
		Total:         u.Total,
		StatusPayment: u.StatusPayment,
	}
}
